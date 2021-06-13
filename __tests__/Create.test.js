import { shallowMount, createLocalVue, mount } from '@vue/test-utils'
import VueRouter from 'vue-router'
import VeeValidate from 'vee-validate';
import Vuex from 'vuex';

const regeneratorRuntime = require("regenerator-runtime");

import { router } from '../src/_helpers/router'
import { store as store_conf } from '../src/_store';
import AddShortcut from '../src/views/AddShortcut.vue'
import { configureFakeBackend } from '../src/_helpers';

const localVue = createLocalVue()
localVue.use(VueRouter)
localVue.use(Vuex)
localVue.use(VeeValidate)
const store = new Vuex.Store(store_conf)

describe('Url shortcut creation', () => {
    let actions
    let my_store
    
    configureFakeBackend();
    
    it('Add action call', async () => {
        await localStorage.setItem('user', JSON.stringify(
        { 
            id: 3,
            username: "test",
            email: "test@email.com",
            firstName: "test_first",
            lastName: "test_last",
            sex: "Male",
            birthdate: "2021-05-04",
            token: 'fake-jwt-token'
        })) 
        const commit = jest.fn()
        const dispatch = jest.fn()

        await store_conf.modules.shortcuts.actions.addShortcut({ dispatch, commit }, "https://jestjs.io/" )
        expect(window.location.pathname).toBe("/")
        expect(commit).toHaveBeenCalledWith("addShortcutRequest", "https://jestjs.io/")
    })
})
