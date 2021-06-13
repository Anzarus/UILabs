<template>
    <nav class="navbar navbar-expand-sm bg-dark justify-content-between sticky-top" >
        
        <router-link class="navbar-brand" to="/"><img src="static/mylogo.png" style="height:35px;"><a class="d-sm-inline d-none">URL Shortener</a></router-link>
        <ul class="navbar-nav">
            <li class="nav-item">
                <router-link class="nav-link" to="/about">About</router-link>
            </li>
            <li v-if="!account.user" class="nav-item">
                <router-link class="nav-link" to="/login">Login</router-link>
            </li>
            <li v-if="!account.user" class="nav-item">
                <router-link class="nav-link" to="/register">Register</router-link>
            </li>
            <li v-if="account.user" class="nav-item">
                <router-link class="nav-link" to="/add">Create</router-link>
            </li>
            <li v-if="account.user" class="nav-item">
                <router-link class="nav-link" to="/profile">Profile</router-link>
            </li>
        </ul>
    </nav>
</template>


<script>
import { mapState } from 'vuex'
export default {
    name: "MyHeader",
    computed: {
        ...mapState({
            account: state => state.account,
        })
    }
};
</script>