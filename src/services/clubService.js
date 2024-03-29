import axios from "../utils/axiosCustomize"

const postCreateClub = async (data) => {
    return await axios.post("/clubs", data);
};

const getClubList = async (params, page, limit) => {
    return await axios.get(
        `/clubs?${params.name ? `name=${params.name}&` : ""}${params.email ? `email=${params.email}&` : ""}${params.isActive !== undefined ? `isActive=${params.isActive}&` : ""}${params.sportTypeId ? `sportTypeId=${params.sportTypeId}&` : ""}${params.pageSize ? `pageSize=${params.pageSize}&` : ""}${params.sortBy ? `sortBy=${params.sortBy}&` : ""}${params.sortDescending ? `sortDescending=${params.sortDescending}&` : ""}`
    );
};


const getClubInfo = async (id) => {
    return await axios.get(`/clubs/${id}`);
};

const putUpdateClub = async (id, data) => {
    return await axios.put(`/clubs/${id}`, data);
};

const deleteClub = async (id) => {
    return await axios.delete(`/clubs/${id}`);
};

export {
    postCreateClub,
    getClubList,
    getClubInfo,
    putUpdateClub,
    deleteClub,
};