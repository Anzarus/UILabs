import { shallowMount } from '@vue/test-utils'
import ProfilePage from '../src/views/ProfilePage.vue'
import VueRouter from 'vue-router'

describe('Testing Profile page', () => {
    const fakeuser = {
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
        status:{ loggedIn: true }
    }

    it('Check fields ', () => {
        const wrapper = shallowMount(ProfilePage, {
            computed: {
                account () {
                    return fakeuser
                }
            }
        }); 
        expect(wrapper.findAll('tr').at(0).findAll('td').at(-1).text()).toBe(fakeuser.user.username)
        expect(wrapper.findAll('tr').at(1).findAll('td').at(-1).text()).toBe(fakeuser.user.email)
        expect(wrapper.findAll('tr').at(2).findAll('td').at(-1).text()).toBe(fakeuser.user.firstName)
        expect(wrapper.findAll('tr').at(3).findAll('td').at(-1).text()).toBe(fakeuser.user.lastName)
        expect(wrapper.findAll('tr').at(4).findAll('td').at(-1).text()).toBe(fakeuser.user.sex)
        expect(wrapper.findAll('tr').at(5).findAll('td').at(-1).text()).toMatch(fakeuser.user.birthdate)
    })
})
