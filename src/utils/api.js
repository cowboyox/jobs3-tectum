import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_JOBS3_BACKEND,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    // Check if we're on the client side
    if (typeof window !== 'undefined') {
      const info = JSON.parse(localStorage.getItem('jobs_2024_token'));
      if (info) {
        const token = info.data.token; // Replace 'your_token_key' with the actual key name
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
