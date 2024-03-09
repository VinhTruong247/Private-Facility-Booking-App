import axios from "../utils/axiosCustomize"

const postCreateClub = async (data) => {
    return await axios.post("/clubs", data);
};

const getClubInfo = async (id) => {
    return await axios.get(`/clubs/${id}`);
};

const putUpdateClub = async (id) => {
    return await axios.put(`/clubs/${id}`);
};

const deleteClub = async (id) => {
    return await axios.delete(`/clubs/${id}`);
};

export {
    postCreateClub,
    getClubInfo,
    putUpdateClub,
    deleteClub,
};