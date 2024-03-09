import axios from "../utils/axiosCustomize"

const postCreateEvent = async (data) => {
    return await axios.post("/events", data);
};

const getEventInfo = async (id) => {
    return await axios.get(`/events/${id}`);
};

const putUpdateEvent = async (id) => {
    return await axios.put(`/events/${id}`);
};

export {
    postCreateEvent,
    getEventInfo,
    putUpdateEvent,
};