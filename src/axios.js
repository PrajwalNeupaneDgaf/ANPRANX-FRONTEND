import axios from 'axios';

const instance = axios.create({
    baseURL: import.meta.env.VITE_MODE==="DEVELOPMENT"?"http://localhost:5000/api":'https://anprax-backend.onrender.com/api', // Replace with your API base URL
    timeout: 10000, // Request timeout in milliseconds
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor
instance.interceptors.request.use(
    (config) => {
        // You can add authorization tokens or other custom headers here
        const token = localStorage.getItem('Token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add a response interceptor
instance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Handle errors globally
        console.error('API Error:', error.response || error.message);
        return Promise.reject(error);
    }
);

export default instance;