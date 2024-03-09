import axios from "../utils/axiosCustomize"

const postCreateArea = async (data) => {
    return await axios.post("/areas", data);
};

const getAreaInfo = async (id) => {
    return await axios.get(`/areas/${id}`);
};

const putUpdateArea = async (id) => {
    return await axios.put(`/areas/${id}`);
};

const deleteArea = async (id) => {
    return await axios.delete(`/areas/${id}`);
};

export {
    postCreateArea,
    getAreaInfo,
    putUpdateArea,
    deleteArea,
};