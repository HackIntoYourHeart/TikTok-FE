// export const api = "https://pentestlabs.site/v1";

import axios from 'axios';

const api = axios.create({
    baseURL: 'https://pentestlabs.site/v1',
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    config => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + token;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

const refreshToken = async () => {
    try {
        const response = await axios.post('https://pentestlabs.site/v1/refresh-token', {
            token: localStorage.getItem('refreshToken'),
        });
        localStorage.setItem('accessToken', response.data.accessToken);
        return response.data.accessToken;
    } catch (error) {
        console.error('Unable to refresh token', error);
        throw error;
    }
};

api.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const newAccessToken = await refreshToken();
                api.defaults.headers.common['Authorization'] = 'Bearer ' + newAccessToken;
                originalRequest.headers['Authorization'] = 'Bearer ' + newAccessToken;
                return api(originalRequest);
            } catch (err) {
                return Promise.reject(err);
            }
        }
        return Promise.reject(error);
    }
);

export default api;