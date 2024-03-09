import axios from "../utils/axiosCustomize"

const postLogin = async (data) => {
    return await axios.post(`/auth/login`, data);
};

const registerAPI = async (data) => {
    return await axios.post(`/auth/register`, data);
};

const postLoginGoogle = async (data) => {
    return await axios.post(`/auth/google-auth`, data);
};

const refreshToken = async (data) => {
    return await axios.post(`/auth/refresh`, data);
};

const logoutAPI = async (data) => {
    return await axios.post(`/auth/logout`, data);
};

export {
    postLogin,
    postLoginGoogle,
    registerAPI,
    refreshToken,
    logoutAPI,
};