import apiClient from '@/api'; // Your API client instance

const state = {
    user: null,
    users: null,
    message: null
};

const mutations = {
    SET_USER(state, user) {
        state.user = user;
    },
    SET_USERS(state, users) {
        state.users = users;
    },
    SET_MESSAGE(state, message) {
        state.message = message;
    },
};

const actions = {
    async register({ commit }, credentials) {
        try {
            const response = await apiClient.register(credentials);
            if(response.status == '201') {
                commit('SET_MESSAGE', 'registered')
            }
        } catch (error) {
            console.error("REGISTER ERROR::", error)
        }
    },
    async login({ commit }, credentials) {
        try {
            const response = await apiClient.login(credentials);
            commit('SET_USER', response.data.user);
            apiClient.setToken(response.data.token_type, response.data.access_token);
            if(response.data.users) {
                commit('SET_USERS', response.data.users);
            }
            localStorage.setItem('authData', JSON.stringify(response.data))
        } catch (error) {
            console.error("LOGIN ERROR::", error)
            // if(error?.response?.data?.message) {
            //    commit('SET_AUTH_MESSAGE', error?.response?.data?.message);
            // }
        }
    },
    async logout({ commit }) {
        try {
            await apiClient.logout();
            commit('SET_USER', null);
            apiClient.setToken("", "");
            localStorage.setItem('authData', null)
        } catch (error) {
            console.error("LOGOUT ERROR::", error)
        }
    },
};

const getters = {
    isAuthenticated: state => !!state.user,
    user: state => state.user,
    users: state => state.users,
    message: state => state.message,
};

export default {
    state,
    mutations,
    actions,
    getters,
};
