import axios from "../utils/axiosCustomize"

const postCreateArea = async (data) => {
    return await axios.post("/areas", data);
};

const getAreaList = async (params) => {
    return await axios.get(
        `/areas?${params.name ? `name=${params.name}&` : ''}${
            params.current ? `current=${params.current}&` : ''
          }${params.pageSize ? `pageSize=${params.pageSize}&` : ''}${
            params.sortBy ? `sortBy=${params.sortBy}&` : ''
          }${params.sortDescending ? `sortDescending=${params.sortDescending}&` : ''}`
    );
};

const getAreaInfo = async (id) => {
    return await axios.get(`/areas/${id}`);
};

const putUpdateArea = async (id, data) => {
    return await axios.put(`/areas/${id}`, data);
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