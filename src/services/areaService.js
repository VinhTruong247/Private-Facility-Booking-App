import axios from "../utils/axiosCustomize"

const postCreateArea = async (data) => {
    return await axios.post("/areas", data);
};

const getAreaList = async (params, page, limit) => {
    return await axios.get(
        `/api/v1/areas?${params.name ? `name=${params.name}&` : ""
        }
        ${params.current ? `current=${params.current}&` : ""}
        ${params.pageSize ? `pageSize=${params.pageSize}&` : ""}
        ${params.sortBy ? `sortBy=${params.sortBy}&` : ""}
        ${params.sortDescending ? `sortDescending=${params.sortDescending}&` : ""
        }PageIndex=${page}&PageSize=${limit}`
    );
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
    getAreaList,
    getAreaInfo,
    putUpdateArea,
    deleteArea,
};