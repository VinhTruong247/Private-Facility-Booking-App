import axios from "../utils/axiosCustomize"

const getAllUsers = async (data) => {
    return await axios.get(`/users`, data);
};

const getUserInfo = async (id) => {
    return await axios.get(`/users/${id}`);
};

const putUpdateUser = async (id) => {
    return await axios.put(`/users/${id}`);
};

export {
    getAllUsers,
    getUserInfo,
    putUpdateUser,
};