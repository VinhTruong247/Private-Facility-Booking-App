import axios from "../utils/axiosCustomize"

const postCreateCourt = async (data) => {
    return await axios.post("/courts", data);
};

const getCourtInfo = async (id) => {
    return await axios.get(`/courts/${id}`);
};

const putUpdateCourt = async (id) => {
    return await axios.put(`/courts/${id}`);
};

const deleteCourt = async (id) => {
    return await axios.delete(`/courts/${id}`);
};

export {
    postCreateCourt,
    getCourtInfo,
    putUpdateCourt,
    deleteCourt,
};