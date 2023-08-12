import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/Auth/Login.vue'
import ResetPassword from '../views/Auth/ResetPassword.vue'
import ForgetPassword from '../views/Auth/ForgetPassword.vue'
import Register from '../views/Auth/Register.vue'
import StoryList from '../views/Story/List.vue'
import StoryForm from '../views/Story/Form.vue'
import StoryDetail from '../views/Story/Detail.vue'
import store from '@/store'
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/forget-password',
    name: 'forget-password',
    component: ForgetPassword
  },
  {
    path: '/reset-password',
    name: 'reset-password',
    component: ResetPassword
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/story',
    name: 'story',
    component: StoryList,
    meta: { requiresAuth: true }
  },
  {
    path: '/story/create',
    name: 'storyCreate',
    component: StoryForm,
    meta: { requiresAuth: true, requiresAdmin: true }
  },
  {
    path: '/story/edit/:id',
    name: 'storyEdit',
    component: StoryForm,
    meta: { requiresAuth: true }
  },
  {
    path: '/story/detail/:id',
    name: 'storyDetail',
    component: StoryDetail,
    meta: { requiresAuth: true }
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Check if the user is authenticated
    if (store.getters.user?.id) {
      if (to.matched.some(record => record.meta.requiresAdmin) && store.getters.user?.role !== 1) {
        router.back();
      } else {
        next();
      }
    } else {
      next({ name: 'login' });
    }
  } else {
    next();
  }
});

export default router
