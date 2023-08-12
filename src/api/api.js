import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:8000/api', // Change this to your API endpoint
    withCredentials: true, // Send cookies along with requests
});

export default {
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
};
