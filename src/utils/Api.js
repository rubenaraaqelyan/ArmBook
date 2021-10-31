import axios from 'axios';

const API = 'http://localhost:5000';
export const api = axios.create({
    baseURL: API,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("access_token")
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
}, Promise.reject);

export const getDataAPI = (url) => {
    return api.get(`${API}/api/${url}`, {});
}

export const postDataAPI = (url, post) => {
    return api.post(`${API}/api/${url}`, post);
}

export const putDataAPI = async (url, post) => {
    return await api.put(`${API}/api/${url}`, post, {});
}

export const patchDataAPI = async (url, post) => {
    return await api.post(`${API}/api/${url}`, post, {});
}

export const deleteDataAPI = async (url) => {
    return await api.delete(`${API}/api/${url}`, {});
}
