import axios from "../utils/axiosCustomize"

const postCreatePost = async (data) => {
    return await axios.post("/posts", data);
};

const getCourtList = async (params) => {
    return await axios.get(
        `/courts?${params.name ? `name=${params.name}&` : ""
        }
        ${params.isAvailable !== undefined ? `isAvailable=${params.isAvailable}&` : ""}
        ${params.sportTypeId ? `sportTypeId=${params.sportTypeId}&` : ""}
        ${params.areaId ? `areald=${params.areaId}&` : ""}
        ${params.current ? `current=${params.current}&` : ""}
        ${params.sortBy ? `sortBy=${params.sortBy}&` : ""}
        ${params.sortDescending ? `sortDescending=${params.sortDescending}&` : ""
        }`
    );
};

const getPostInfo = async (id) => {
    return await axios.get(`/posts/${id}`);
};

const putUpdatePost = async (id, data) => {
    return await axios.put(`/posts/${id}`, data);
};

const deletePost = async (id) => {
    return await axios.delete(`/posts/${id}`);
};

export {
    postCreatePost,
    getCourtList,
    getPostInfo,
    putUpdatePost,
    deletePost,
};