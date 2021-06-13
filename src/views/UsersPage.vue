<template>
    <div>
        <h5>Users from secure api end point:</h5>
        <em v-if="users.loading">Loading users...</em>
        <span v-if="users.error" class="text-danger">ERROR: {{users.error}}</span>
        <ul v-if="users.items" id="users-list">
            <li v-for="user in users.items" :key="user.id" >
                {{user.id + ' ' + user.firstName + ' ' + user.lastName}}
                <span v-if="user.deleting"><em> - Deleting...</em></span>
                <span v-else-if="user.deleteError" class="text-danger"> - ERROR: {{user.deleteError}}</span>
                <span v-else> - <a @click="deleteUser(user.id)" class="text-danger">Delete</a></span>
            </li>
        </ul>
        <h5>Shortcuts:</h5>
        <em v-if="shortcuts.loading">Loading shortcuts...</em>
        <span v-if="shortcuts.error" class="text-danger">{{shortcuts.error}}</span>
        <div v-if="shortcuts.items" id="shortcut-list">
            <div class="media border p-2"  v-for="shortcut in shortcuts.items" :key="shortcut.id">
                <div class="media-body">
                    <h6>
                        <a @click="copyLink(shortcut)">{{  shortcut.sk }}</a> <small><i>  {{ "ID:" + shortcut.id + ' usr:' + shortcut.user }}</i></small>
                        <span class="badge badge-warning badge-pill float-right"> 
                        <a @click="deleteShortcut(shortcut.id)">Delete</a>
                        </span> 
                    </h6>
                    <p>
                        <a :href= "shortcut.link" target="_blank">{{shortcut.link}}</a> 
                    </p>
                    <span v-if="shortcut.deleting"><em> - Deleting shortcut...</em></span>
                    <!-- <span v-else-if="shortcut.copied"><em> Copied </em></span> -->
                    <span v-else-if="shortcut.deleteError" class="text-danger"> - ERROR: {{shortcut.deleteError}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    computed: {
        ...mapState({
            account: state => state.account,
            users: state => state.users.all,
            shortcuts: state => state.shortcuts.all,
        })
    },
    created () {
        this.getAllUsers();
        this.getAllShortcuts();
    },
    methods: {
        ...mapActions('users', {
            getAllUsers: 'getAll',
            deleteUser: 'delete'
        }),
        ...mapActions('shortcuts', {
            getAllShortcuts: 'getAllShortcuts',
            deleteShortcut: 'delete',
        }),
        copyLink(shortcut)
        {
            console.log(shortcut.sk)
            console.log(event.target)
            try {
                var succ = navigator.clipboard.writeText(shortcut.sk);
                //shortcut.copied = true;
                // console.log(shortcut.copied )
            } catch (err) {
                console.log('Oops, unable to copy');
            }
        }
    }
};
</script>
            