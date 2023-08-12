import apiClient from '@/api/api'; // Your API client instance

const state = {
    user: null,
};

const mutations = {
    SET_USER(state, user) {
        state.user = user;
    },
};

const actions = {
    async login({ commit }, credentials) {
        try {
            const response = await apiClient.login(credentials);
            commit('SET_USER', response.data.user);
        } catch (error) {
            throw new Error('Login failed');
        }
    },
    async logout({ commit }) {
        try {
            await apiClient.logout();
            commit('SET_USER', null);
        } catch (error) {
            throw new Error('Logout failed');
        }
    },
};

const getters = {
    isAuthenticated: state => !!state.user,
    user: state => state.user,
};

export default {
    state,
    mutations,
    actions,
    getters,
};
