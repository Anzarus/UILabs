import Vue from 'vue';
import VeeValidate from 'vee-validate';
import Vuex from 'vuex';

import { store as store_conf } from './_store';
import { router } from './_helpers';
import App from './app/App';

Vue.use(VeeValidate);
Vue.use(Vuex);
// setup fake backend
import { configureFakeBackend } from './_helpers';
configureFakeBackend();
const store = new Vuex.Store(store_conf)


new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});