<template>
    <div>
        <h2 class="text-center">Register</h2>
        <form @submit.prevent="handleSubmit">
            <div class="form-group">
                <label for="firstName">First Name</label>
                <input type="text" v-model="user.firstName" v-validate="'required'" name="firstName" class="form-control" :class="{ 'is-invalid': submitted && errors.has('firstName') }" />
                <div v-if="submitted && errors.has('firstName')" class="invalid-feedback">{{ errors.first('firstName') }}</div>
            </div>
            <div class="form-group">
                <label for="lastName">Last Name</label>
                <input type="text" v-model="user.lastName" v-validate="'required'" name="lastName" class="form-control" :class="{ 'is-invalid': submitted && errors.has('lastName') }" />
                <div v-if="submitted && errors.has('lastName')" class="invalid-feedback">{{ errors.first('lastName') }}</div>
            </div>
            <div class="form-group">
                <label for="email">E-mail</label>
                <input type="text" v-model="user.email" v-validate="'required|email'" name="email" class="form-control" :class="{ 'is-invalid': submitted && errors.has('email') }" />
                <div v-if="submitted && errors.has('email')" class="invalid-feedback">{{ errors.first('email') }}</div>
            </div>
            <div class="form-group">
                <label for="sex">Sex</label>
                <select v-model="user.sex" name="sex" v-validate="'required'" class="form-control" :class="{ 'is-invalid': submitted && errors.has('username') }" >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other" selected>Other</option>
                </select>
                <div v-if="submitted && errors.has('sex')" class="invalid-feedback">{{ errors.first('sex') }}</div>
            </div>
            <div class="form-group">
                <label for="birthdate">Birthdate</label>
                <datepicker name="birthdate" v-model="user.birthdate" :disabled-dates="disabledDates" :use-utc="True" v-validate="'required'"  class="form-control" :class="{ 'is-invalid': submitted && errors.has('birthdate') }" :inputClass="{ 'is-invalid': submitted && errors.has('birthdate'), 'form-control': true }" style="padding:0"></datepicker>
                <div v-if="submitted && errors.has('birthdate')" class="invalid-feedback">{{ errors.first('birthdate') }}</div>
                <!-- <input type='date' name="birthdate" v-model="user.birthdate" v-validate="'date_between:01.01.1850,01.01.2022|required'" class="form-control" :class="{ 'is-invalid': submitted && errors.has('birthdate') }"/>
                <div v-if="submitted && errors.has('birthdate')" class="invalid-feedback">{{ errors.first('birthdate') }}</div> -->
            </div>

            <div class="form-group">
                <label for="username">Username</label>
                <input type="text" v-model="user.username" v-validate="'required'" name="username" class="form-control" :class="{ 'is-invalid': submitted && errors.has('username') }" />
                <div v-if="submitted && errors.has('username')" class="invalid-feedback">{{ errors.first('username') }}</div>
            </div>
            <div class="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" v-model="user.password" v-validate="{ required: true, min: 6 }" name="password" class="form-control" :class="{ 'is-invalid': submitted && errors.has('password') }"  />
                <div v-if="submitted && errors.has('password')" class="invalid-feedback">{{ errors.first('password') }}</div>
            </div>
            <div class="form-group">
                <button class="btn btn-primary" :disabled="status.registering">Register</button>
                <img v-show="status.registering" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                <router-link to="/login" class="btn btn-link">Cancel</router-link>
            </div>
        </form>
    </div>
</template>
<script src="https://unpkg.com/vue"></script>
<script src="https://unpkg.com/vuejs-datepicker"></script>
<script>
import { mapState, mapActions } from 'vuex'
import Datepicker from 'vuejs-datepicker'

export default {
    data () {
        return {
            user: {
                firstName: '',
                lastName: '',
                email: '',
                sex: '',
                birthdate: '',
                username: '',
                password: ''
            },
            submitted: false,
            disabledDates: {
                to: new Date(1850, 1, 1), // Disable all dates up to specific date
                from: new Date(2022, 1, 1), // Disable all dates after specific date
            }
        }
    },
    components: {
        Datepicker
    },
    computed: {
        ...mapState('account', ['status']),
    },
    methods: {
        ...mapActions('account', ['register']),
        handleSubmit(e) {
            this.submitted = true;
            this.$validator.validate().then(valid => {
                if (valid) {
                    this.register(this.user);
                }
            });
        }
    }
};

</script>