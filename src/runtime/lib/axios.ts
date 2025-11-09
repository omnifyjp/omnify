import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

// Create axios instance for Laravel API
export const createLaravelAxios = (baseURL: string) => {
    const axiosInstance = axios.create({
        baseURL,
        timeout: 30000,
        withCredentials: true,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        xsrfCookieName: 'XSRF-TOKEN',
        xsrfHeaderName: 'X-XSRF-TOKEN',
    });

    // Helper to get cookie value by name
    function getCookie(name: string): string | null {
        if (typeof document === 'undefined') return null;
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
        return null;
    }

    // Request interceptor
    axiosInstance.interceptors.request.use(
        (config: InternalAxiosRequestConfig) => {
            const token = getCookie('XSRF-TOKEN');
            if (token) {
                config.headers['X-XSRF-TOKEN'] = decodeURIComponent(token);
            }
            return config;
        },
        (error: AxiosError) => {
            return Promise.reject(error);
        }
    );

    return axiosInstance;
};

/**
 * Get CSRF cookie before making authenticated requests
 * Required for Laravel Sanctum cookie-based authentication
 */
export const getCsrfCookie = async (baseURL: string): Promise<void> => {
    await axios.get(`${baseURL}/sanctum/csrf-cookie`, {
        withCredentials: true,
    });
};

