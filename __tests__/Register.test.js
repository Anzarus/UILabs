import { shallowMount, createLocalVue, mount } from '@vue/test-utils'
import VueRouter from 'vue-router'
import VeeValidate from 'vee-validate';
import Vuex from 'vuex';

const regeneratorRuntime = require("regenerator-runtime");

import { router } from '../src/_helpers/router'
import { store as store_conf } from '../src/_store';
import RegisterPage from '../src/views/RegisterPage.vue'
import { configureFakeBackend } from '../src/_helpers';

const localVue = createLocalVue()
localVue.use(VueRouter)
localVue.use(Vuex)
localVue.use(VeeValidate)
const store = new Vuex.Store(store_conf)

describe('Register testing', () => {
    
    configureFakeBackend();
    it('Empty fields trigger validation ', async () => {
    const wrapper = shallowMount(RegisterPage, {
         localVue, router,
         data () {
            return {
                user: {
                    firstName: '',
                    lastName: '',
                    email: '',
                    sex: '',
                    birthdate: '',
                    username: '',
                    password: ''
                },
                submitted: false,
                disabledDates: {
                    to: new Date(1850, 1, 1), // Disable all dates up to specific date
                    from: new Date(2022, 1, 1), // Disable all dates after specific date
                }
            }
            },
            global: {
                plugins: [store]
            },
            computed: { 
                status(){
                    return {} 
                }},
            actions: {
                handleSubmit(e) {
                    this.submitted = true;
                    this.$validator.validate().then(valid => {
                        if (valid) {
                            this.register(this.user);
                        }
                    });
                }
            }
        })

        await wrapper.find('form').trigger('submit')
        expect(wrapper.findAll('.invalid-feedback').length).toBeGreaterThanOrEqual(0)
    })
})