<template>
    <div class="container w-100 bg-light">
        <MyHeader/>
        <div style="margin:10px"></div>
        <div class="container-fluid row justify-content-center">
            <div class="col-sm-8 ">
                <div v-if="alert.message" :class="`alert ${alert.type}`">{{alert.message}}</div>
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import MyHeader from '../components/MyHeader.vue'

export default {
    name: 'app',
    computed: {
        ...mapState({
            alert: state => state.alert
        })
    },
    components:{
        MyHeader
    },
    methods: {
        ...mapActions({
            clearAlert: 'alert/clear' 
        })
    },
    watch: {
        $route (to, from){
            // clear alert on location change
            this.clearAlert();
        }
    } 
};
</script>