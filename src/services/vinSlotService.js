import axios from "../utils/axiosCustomize";

const postCreateSlot = async (data) => {
  return await axios.post("/vin-slots", data);
};

const getVinSlotList = async (params) => {
  try {
    const response = await axios.get(
      `/vin-slots?${params.status ? `status=${params.status}&` : ""}${
        params.createdBy ? `createdBy=${params.createdBy}&` : ""
      }${params.courtId ? `courtId=${params.courtId}&` : ""}${
        params.current ? `current=${params.current}&` : ""
      }${params.pageSize ? `pageSize=${params.pageSize}&` : ""}${
        params.sortBy ? `sortBy=${params.sortBy}&` : ""
      }${
        params.sortDescending ? `sortDescending=${params.sortDescending}&` : ""
      }`
    );
    return response; // Return the entire response object
  } catch (error) {
    throw error; // Propagate the error to the caller for handling
  }
};


const getSlotInfo = async (id) => {
  return await axios.get(`/vin-slots/${id}`);
};

const putUpdateSlot = async (id, data) => {
  return await axios.put(`/vin-slots/${id}`, data);
};

export {
  postCreateSlot,
  getVinSlotList,
  getSlotInfo,
  putUpdateSlot,
};
