import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { toastService } from './Toastservice';

// Base URL sourced from Vite environment variable
const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '/api';

// Singleton Axios instance shared across all API calls
export const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 15_000,
  headers: { 'Content-Type': 'application/json' },
});

// Request interceptor — attaches the stored JWT to every outbound request
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = localStorage.getItem('auth_token');
    if (token && config.headers) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor — handles global error cases (401, 500, etc.)
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    const status = error?.response?.status;

    // Redirect to login on token expiry
    if (status === 401) {
      localStorage.removeItem('auth_token');
      window.location.href = '/login';
    }

    // Show a user-visible toast for server errors
    if (status >= 500) {
      toastService.error('A server error occurred. Please try again later.');
    }

    return Promise.reject(error);
  }
);

/** Thin wrappers for common HTTP verbs — re-export for convenience */
export const get = <T>(url: string, config?: AxiosRequestConfig) =>
  apiClient.get<T>(url, config).then((r) => r.data);

export const post = <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
  apiClient.post<T>(url, data, config).then((r) => r.data);

export const put = <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
  apiClient.put<T>(url, data, config).then((r) => r.data);

export const patch = <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
  apiClient.patch<T>(url, data, config).then((r) => r.data);

export const del = <T>(url: string, config?: AxiosRequestConfig) =>
  apiClient.delete<T>(url, config).then((r) => r.data);
