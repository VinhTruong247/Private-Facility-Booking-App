import axios from "../utils/axiosCustomize"

const postSportType = async (data) => {
    return await axios.post("/sport-types", data);
};

const getSportTypeInfo = async (id) => {
    return await axios.get(`/sport-types/${id}`);
};

const putUpdateSportType = async (id) => {
    return await axios.put(`/sport-types/${id}`);
};

const deleteSportType = async (id) => {
    return await axios.delete(`/sport-types/${id}`);
};

export {
    postSportType,
    getSportTypeInfo,
    putUpdateSportType,
    deleteSportType,
};