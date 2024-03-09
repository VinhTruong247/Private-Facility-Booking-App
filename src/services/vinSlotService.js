import axios from "../utils/axiosCustomize"

const postCreateSlot = async (data) => {
    return await axios.post("/vin-slots", data);
};

const getSlotInfo = async (id) => {
    return await axios.get(`/vin-slots/${id}`);
};

const putUpdateSlot = async (id) => {
    return await axios.put(`/vin-slots/${id}`);
};

export {
    postCreateSlot,
    getSlotInfo,
    putUpdateSlot,
};