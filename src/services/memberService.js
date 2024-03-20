import axios from "../utils/axiosCustomize"

const postCreateMember = async (data) => {
    return await axios.post("/members", data);
};

const getAllMembers = async (params) => {
    return await axios.get(
        `/members?${params.isLeader ? `isLeader=${params.isLeader}&` : ""
        }
        ${params.eventId ? `eventId=${params.eventId}&` : ""}
        ${params.clubId ? `clubId=${params.clubId}&` : ""}
        ${params.userId ? `userId=${params.userId}&` : ""}
        ${params.current ? `current=${params.current}&` : ""}
        ${params.pageSize ? `pageSize=${params.pageSize}&` : ""}
        ${params.sortBy ? `sortBy=${params.sortBy}&` : ""}
        ${params.sortDescending ? `sortDescending=${params.sortDescending}&` : ""
        }`
    );
};

const getMemberInfo = async (id) => {
    return await axios.get(`/members/${id}`);
};

const putUpdateMember = async (id, data) => {
    return await axios.put(`/members/${id}`, data);
};

const deleteMember = async (id) => {
    return await axios.delete(`/members/${id}`);
};

export {
    postCreateMember,
    getAllMembers,
    getMemberInfo,
    putUpdateMember,
    deleteMember,
};