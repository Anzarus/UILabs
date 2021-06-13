import { shallowMount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'

import { router } from '../src/_helpers/router'
import MyHeader from '../src/components/MyHeader.vue'

const localVue = createLocalVue()
localVue.use(VueRouter)

describe('Testing existing Navbar components', () => {
    it('Not logged in ', () => {
        const wrapper = shallowMount(MyHeader, { localVue, router,
            computed: {
                account () {
                    return { user:null, status:{} }
                }
            }
        }); 
        expect(wrapper.findAllComponents({name: 'router-link'}).at(2).text()).toBe("Login")
        expect(wrapper.findAllComponents({name: 'router-link'}).at(3).text()).toBe("Register")
    })

    it('Logged in ', () => {
        const wrapper = shallowMount(MyHeader, { localVue, router,
            computed: {
                account () {
                    return { 
                        user:{
                            id: 3,
                            username: "test",
                            email: "test@email.com",
                            firstName: "test_first",
                            lastName: "test_last",
                            sex: "Male",
                            birthdate: "2021-05-04",
                            token: 'fake-jwt-token'
                        },
                        status:{ loggedIn: true } }
                }
            }
        }); 
        expect(wrapper.findAllComponents({name: 'router-link'}).at(2).text()).toBe("Create")
        expect(wrapper.findAllComponents({name: 'router-link'}).at(3).text()).toBe("Profile")
    })
})
