import axios from 'axios';
import { backend_url } from './variables';

// Create an Axios instance
const api = axios.create({
    baseURL: backend_url,
    // Initialize headers without the Authorization part
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add a request interceptor
api.interceptors.request.use(config => {
    // Check if we're on the client side
    if (typeof window!== 'undefined') {
        const token = JSON.parse(localStorage.getItem('jobs_2024_token')).data.token; // Replace 'your_token_key' with the actual key name
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
}, error => {
    return Promise.reject(error);
});

export default api;