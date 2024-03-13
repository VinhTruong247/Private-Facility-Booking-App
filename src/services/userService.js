import axios from "../utils/axiosCustomize"

const getAllUsers = async (params, page, limit) => {
    return await axios.get(
        `/api/v1/users?${params.username ? `username=${params.username}&` : ""
        }
        ${params.email ? `email=${params.email}&` : ""}
        ${params.phone ? `phone=${params.phone}&` : ""}
        ${params.isActive !== undefined ? `isActive=${params.isActive}&` : ""}
        ${params.roleId ? `roleId=${params.roleId}&` : ""}
        ${params.current ? `current=${params.current}&` : ""}
        ${params.sortBy ? `sortBy=${params.sortBy}&` : ""}
        ${params.sortDescending ? `sortDescending=${params.sortDescending}&` : ""
        }PageIndex=${page}&PageSize=${limit}`
    );
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