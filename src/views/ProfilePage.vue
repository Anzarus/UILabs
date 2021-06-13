<template>
<div class="justify-content-center">

    <table v-if="account.user" class="table">
        <tr>
            <td>Username:</td>
            <td>{{account.user.username}}</td>
        </tr>
        <tr>
            <td>E-mail:</td>
            <td>{{account.user.email}}</td>
        </tr>
        <tr>
            <td>First name:</td>
            <td>{{account.user.firstName}}</td>
        </tr>
        <tr>
            <td>Last Name:</td>
            <td>{{account.user.lastName}}</td>
        </tr>
        <tr>
            <td>Sex:</td>
            <td>{{account.user.sex}}</td>
        </tr>
        <tr>
            <td>Birthday:</td>
            <td>{{account.user.birthdate}}</td>
        </tr>
    </table>
    <div class="container" style="padding: 20px">
        <router-link class="btn btn-info"  to="/login">Logout</router-link>
    </div>
</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Header from '../components/MyHeader.vue'

export default {
    computed: {
        ...mapState({
            account: state => state.account,
        })
    },
};
</script>