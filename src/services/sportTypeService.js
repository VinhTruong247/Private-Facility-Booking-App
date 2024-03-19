import axios from "../utils/axiosCustomize"

const postSportType = async (data) => {
    return await axios.post("/sport-types", data);
};

const getSportList = async (params) => {
    return await axios.get(
        `/sport-types?${params.name ? `name=${params.name}&` : ""
        }
        ${params.current ? `current=${params.current}&` : ""}
        ${params.pageSize ? `pageSize=${params.pageSize}&` : ""}
        ${params.sortBy ? `sortBy=${params.sortBy}&` : ""}
        ${params.sortDescending ? `sortDescending=${params.sortDescending}&` : ""
        }`
    );
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
    getSportList,
    getSportTypeInfo,
    putUpdateSportType,
    deleteSportType,
};