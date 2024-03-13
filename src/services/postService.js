import axios from "../utils/axiosCustomize"

const postCreatePost = async (data) => {
    return await axios.post("/posts", data);
};

const getCourtList = async (params) => {
    return await axios.get(
        `/api/v1/courts?${params.name ? `name=${params.name}&` : ""
        }
        ${params.isAvailable !== undefined ? `isAvailable=${params.isAvailable}&` : ""}
        ${params.sportTypeld ? `sportTypeld=${params.sportTypeld}&` : ""}
        ${params.areald ? `areald=${params.areald}&` : ""}
        ${params.current ? `current=${params.current}&` : ""}
        ${params.pageSize ? `pageSize=${params.pageSize}&` : ""}
        ${params.sortBy ? `sortBy=${params.sortBy}&` : ""}
        ${params.sortDescending ? `sortDescending=${params.sortDescending}&` : ""
        }`
    );
};

const getPostInfo = async (id) => {
    return await axios.get(`/posts/${id}`);
};

const putUpdatePost = async (id) => {
    return await axios.put(`/posts/${id}`);
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