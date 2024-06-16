import axios from 'axios'
import { backend_url } from './variables'

const api = axios.create({
    baseURL: backend_url,
    headers: {
        'Content-Type': 'application/json',

        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NjU0ZjBmMjU2ZmI2NDBiNWVlNjI1MCIsImlhdCI6MTcxNzkyMzc1NywiZXhwIjoxNzE4NTI4NTU3fQ.n7I0XJxv3gOXpuKqd4NWhSFQxCKtRcMgUlBzxuPUwIo'
    }
})

// Add a request interceptor
api.interceptors.request.use(config => {
    // Check if we're on the client side
    if (typeof window !== 'undefined') {
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
