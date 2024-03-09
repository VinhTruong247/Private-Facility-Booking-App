import axios from "../utils/axiosCustomize"

const postCreateMember = async (data) => {
    return await axios.post("/members", data);
};

const getMemberInfo = async (id) => {
    return await axios.get(`/members/${id}`);
};

const putUpdateMember = async (id) => {
    return await axios.put(`/members/${id}`);
};

const deleteMember = async (id) => {
    return await axios.delete(`/members/${id}`);
};

export {
    postCreateMember,
    getMemberInfo,
    putUpdateMember,
    deleteMember,
};