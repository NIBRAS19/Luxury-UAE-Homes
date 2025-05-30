
import axios from 'axios';

// Create an axios instance with common configuration
const api = axios.create({
  baseURL: '/api', // Adjust this based on your backend URL
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Request interceptor for API calls
api.interceptors.request.use(
  (config) => {
    // You can add auth token here if needed
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for API calls
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Global error handling
    console.error('API Error:', error);
    
    // Handle specific error cases
    if (error.response?.status === 401) {
      // Handle unauthorized errors (e.g., redirect to login)
      console.log('Unauthorized, redirecting to login...');
      // window.location.href = '/auth';
    }
    
    return Promise.reject(error);
  }
);

export default api;
