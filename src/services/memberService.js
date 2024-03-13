import axios from "../utils/axiosCustomize"

const postCreateMember = async (data) => {
    return await axios.post("/members", data);
};

const getAllMembers = async (params, page, limit) => {
    return await axios.get(
        `/api/v1/members?${params.isLeader ? `isLeader=${params.isLeader}&` : ""
        }
        ${params.eventid ? `eventid=${params.eventid}&` : ""}
        ${params.clubld ? `clubld=${params.clubld}&` : ""}
        ${params.userld ? `userld=${params.userld}&` : ""}
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