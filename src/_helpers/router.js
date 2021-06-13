import Vue from 'vue';
import VueRouter from 'vue-router';

import HomePage from '../views/HomePage'
import LoginPage from '../views/LoginPage'
import RegisterPage from '../views/RegisterPage'
import AddShortcut from '../views/AddShortcut'
import UsersPage from '../views/UsersPage'
import ProfilePage from '../views/ProfilePage'
import About from '../views/About'

Vue.use(VueRouter);

export const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', component: HomePage },
    { path: '/login', component: LoginPage },
    { path: '/register', component: RegisterPage },
    { path: '/add', component: AddShortcut },
    { path: '/users', component: UsersPage },
    { path: '/profile', component: ProfilePage },
    { path: '/about', component: About },
    //{ path: '/go/:id', component: GoURL },
    { path: '*', redirect: '/' }
  ]
});

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/login', '/register', '/about', '/'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  if (authRequired && !loggedIn) {
    return next('/login');
  }

  next();
})