import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/dashboard',
  },
  {
    name: 'dashboard',
    path: '/dashboard',
    component: () => import('../views/Dashboard.vue'),
  },
  {
    name: 'applications',
    path: '/applications',
    component: () => import('../views/Applications.vue'),
  },
  {
    name: 'shop',
    path: '/shop',
    component: () => import('../views/Shop.vue'),
  },
  {
    name: 'support',
    path: '/support',
    component: () => import('../views/Support.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
