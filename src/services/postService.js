import axios from "../utils/axiosCustomize"

const postCreatePost = async (data) => {
    return await axios.post("/posts", data);
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
    getPostInfo,
    putUpdatePost,
    deletePost,
};