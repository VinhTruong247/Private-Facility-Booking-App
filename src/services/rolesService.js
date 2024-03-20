import axios from "../utils/axiosCustomize"

const postCreateRole = async (data) => {
    return await axios.post("/roles", data);
};

const getRoleList = async () => {
    return await axios.get(`/roles`);
};

const getRoleInfo = async (id) => {
    return await axios.get(`/roles/${id}`);
};

const deleteRole = async (id) => {
    return await axios.delete(`/roles/${id}`);
};

export {
    postCreateRole,
    getRoleList,
    getRoleInfo,
    deleteRole,
};