import Vue from 'vue';
import Vuex from 'vuex';

import { alert } from './alert.module';
import { account } from './account.module';
import { users } from './users.module';
import { shortcuts } from './shortcuts.module';

/*export const store = new Vuex.Store({
    modules: {
        alert,
        account,
        users,
        shortcuts
    }
});*/

export const store = {
    modules: {
        alert,
        account,
        users,
        shortcuts
    }
}
