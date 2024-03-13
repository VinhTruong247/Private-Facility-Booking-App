import axios from "../utils/axiosCustomize"

const postCreateSlot = async (data) => {
    return await axios.post("/vin-slots", data);
};

const getVinSlotList = async (params, page, limit) => {
    return await axios.get(
        `/api/v1/vin-slots?${params.status ? `status=${params.status}&` : ""
        }
    ${params.createdBy ? `createdBy=${params.createdBy}&` : ""}
        ${params.courtid ? `courtid=${params.courtid}&` : ""}
        ${params.current ? `current=${params.current}&` : ""}
        ${params.pageSize ? `pageSize=${params.pageSize}&` : ""}
        ${params.sortBy ? `sortBy=${params.sortBy}&` : ""}
        ${params.sortDescending ? `sortDescending=${params.sortDescending}&` : ""
        }`
    );
};

const getSlotInfo = async (id) => {
    return await axios.get(`/vin-slots/${id}`);
};

const putUpdateSlot = async (id) => {
    return await axios.put(`/vin-slots/${id}`);
};

export {
    postCreateSlot,
    getVinSlotList,
    getSlotInfo,
    putUpdateSlot,
};