import { shortcutsService } from '../_services';
import { router } from '../_helpers';

//shortcuts = JSON.parse(localStorage.getItem('shortcuts'));
//const user = JSON.parse(localStorage.getItem('user'));
//
const state = {
    all: {},
}

const actions = {
    addShortcut({ dispatch, commit }, shortcut) {
        commit('addShortcutRequest', shortcut);
        shortcutsService.addShortcut(shortcut)
            .then(
                shortcut => {
                    commit('addShortcutSuccess', shortcut);
                    router.push('/');
                    setTimeout(() => {
                        dispatch('alert/success', 'Successfully added shortcut', { root: true });
                    })
                },
                error => {
                    commit('addShortcutFailure', error);
                    dispatch('alert/error', error, { root: true });
                }
            );
    },

    getAllShortcuts({ commit }) {
        commit('getShortcutsRequest');

        shortcutsService.getAll()
            .then(
                shortcuts => commit('getShortcutsSuccess', shortcuts),
                error => commit('getShortcutsFailure', error)
            );
    },

    getUserShortcuts({ commit }, uid) {
        commit('getShortcutsRequest');

        shortcutsService.getByUser(uid)
            .then(
                shortcuts => commit('getShortcutsSuccess', shortcuts),
                error => commit('getShortcutsFailure', error)
            );
    },

    delete({ commit }, id) {
        commit('deleteShortcutRequest', id);

        shortcutsService.delete(id)
            .then(
                shortcut => commit('deleteShortcutSuccess', id),
                error => commit('deleteShortcutFailure', { id, error: error.toString() })
            );
    }
};

const mutations = {
    getShortcutsRequest(state) {
        state.all = { loading: true };
    },
    getShortcutsSuccess(state, shortcuts) {
        state.all = { items: shortcuts };
    },
    getShortcutsFailure(state, error) {
        state.all = { error };
    },
    deleteShortcutRequest(state, id) {
        state.all.items = state.all.items.map(shortcut =>
            shortcut.id === id
                ? { ...shortcut, deleting: true }
                : shortcut
        )
    },
    
    deleteShortcutSuccess(state, id) {
        state.all.items = state.all.items.filter(shortcut => shortcut.id !== id)
    },
    deleteShortcutFailure(state, { id, error }) {
        state.all.items = state.all.items.map(shortcut => {
            if (shortcut.id === id) {
                const { deleting, ...shortcutCopy } = shortcut;
                return { ...shortcutCopy, deleteError: error };
            }

            return shortcut;
        })
    },
    addShortcutRequest(state, shortcut) {
        state.all = { adding: true };
    },
    addShortcutSuccess(state, shortcut) {
        state.all = {};
    },
    addShortcutFailure(state, error) {
        state.all = {};
    }
};

export const shortcuts = {
    namespaced: true,
    state,
    actions,
    mutations
};