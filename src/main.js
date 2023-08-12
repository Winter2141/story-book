import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "./style/tailwind.css"
import apiClient from '@/api';

const authData = JSON.parse(localStorage.getItem('authData'));

if (authData?.user?.id) {
    store.commit('SET_USER', authData.user);
    if (authData.users) {
        store.commit('SET_USERS', authData.users);
    }
    apiClient.setToken(authData?.token_type, authData?.access_token);
}
createApp(App).use(store).use(router).mount('#app')
