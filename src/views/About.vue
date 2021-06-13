<template>
    <div class= "container justify-content-center">
        <div class="text-center"><img src="static/mylogo.png"></div>
        <h5 class="text-center" style="padding:10px"> Welcome to URL shotener vue app.</h5>
        <h5 id="login-line" v-if="!account.user" class="text-center">To access full functionality please <router-link to="/login">log in</router-link>
            or <router-link to="/register">sign up</router-link> </h5>
        <p class="text-center" v-if="account.user"><router-link to="/users">Debug page with all users and shortcuts</router-link></p>
        <p class="text-center" >You can check out my <a href="https://github.com/Anzarus/UILabs" target="_blank">project here</a></p>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: "About",
    computed: {
        ...mapState({
            account: state => state.account,
        })
    }
};
</script>