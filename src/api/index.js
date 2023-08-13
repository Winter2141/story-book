import axios from 'axios';
import store from '@/store'
const apiClient = axios.create({
    baseURL: 'http://localhost:8000/api', // Change this to your API endpoint
    withCredentials: true, // Send cookies along with requests
});


// const authData = JSON.parse(localStorage.getItem('authData'));
//
// if (authData?.access_token && authData?.token_type) {
//     apiClient.interceptors.request.use(
//         (config) => {
//             // Get the token from your Vuex store or wherever you store it
//             const token = `${authData?.token_type} ${authData?.access_token}`;
//
//             if (token) {
//                 config.headers.Authorization = token;
//             }
//
//             return config;
//         },
//         (error) => {
//             return Promise.reject(error);
//         }
//     );
// }

apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if(error.response) {
            if(error?.response?.data?.message || error?.response?.data?.errors) {
                console.log(JSON.stringify(error?.response?.data?.errors), 'error?.response?.data?.errors')
                store.commit("SET_MESSAGE", error?.response?.data?.errors ? error?.response?.data?.errors : error?.response?.data?.message)
            } else {
                switch (error.response) {
                    case 401:
                        store.commit("SET_MESSAGE", "Your credentials are not correct.")
                        break;
                    case 404:
                        store.commit("SET_MESSAGE", "The api does not exist.")
                        break;
                    case 400:
                        store.commit("SET_MESSAGE", "You request has failed.")
                        break;
                    case 500:
                        store.commit("SET_MESSAGE", "Server error.")
                        break;
                }
            }
        }
        return Promise.reject(error);
    }
)

export default {
    setToken(tokenType, token) {
        apiClient.defaults.headers.common['Authorization'] = `${tokenType} ${token}`;
    },
    register(credentials) {
        return apiClient.post('/register', credentials);
    },
    login(credentials) {
        return apiClient.post('/login', credentials);
    },
    logout() {
        return apiClient.post('/logout');
    },
    getUser() {
        return apiClient.get('/user');
    },
    getStory(searchParams) {
        return apiClient.post('/story/list', searchParams);
    },
    getStoryById(id) {
        return apiClient.get(`/story/${id}`);
    },
    deleteStory(id) {
        return apiClient.delete(`/story/${id}`);
    },
    createStory(params) {
        return apiClient.post(`/story`, params);
    },
    updateStory(params, id) {
        return apiClient.put(`/story/${id}`, params);
    },
};
