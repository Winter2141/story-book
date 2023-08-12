import apiClient from '@/api/api'; // Your API client instance

const state = {
    stories: null,
};

const mutations = {
    SET_STORIES(state, stories) {
        state.stories = stories;
    },
};

const actions = {
    async fetchStory({ commit }, searchParams) {
        try {
            const response = await apiClient.getStory(searchParams);
            commit('SET_STORIES', response.data);
        } catch (error) {
            throw new Error('Login failed');
        }
    },
};

const getters = {
    stories: state => state.stories,
};

export default {
    state,
    mutations,
    actions,
    getters,
};
