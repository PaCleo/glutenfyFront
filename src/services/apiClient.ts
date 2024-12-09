import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
});

apiClient.interceptors.response.use(
  response => response,
  error => {
      if (error.response && error.response.status === 401) {
          // Redireciona para a página de login
          window.location.href = '/login';
      }
      return Promise.reject(error);
  }
);

export { apiClient };