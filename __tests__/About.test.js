import { shallowMount } from '@vue/test-utils'
import About from '../src/views/About.vue'
import VueRouter from 'vue-router'

describe('Testing About', () => {
    it('check login line ', () => {
        const wrapper = shallowMount(About, {
            computed: {
                account () {
                    return { user:null, status:{} }
                }
            }
        }); 
        expect(wrapper.find('#login-line').exists()).toBe(true)
    })
})
