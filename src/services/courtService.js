import axios from "../utils/axiosCustomize"

const postCreateCourt = async (data) => {
    return await axios.post("/courts", data);
};

const getCourtList = async (params) => {
    return await axios.get(
        `/courts?${params.name ? `name=${params.name}&` : ""
        }${params.isAvailable !== undefined ? `isAvailable=${params.isAvailable}&` : ""
        }${params.sportTypeId ? `sportTypeId=${params.sportTypeId}&` : ""
        }${params.areaId ? `areaId=${params.areaId}&` : ""
        }${params.current ? `current=${params.current}&` : ""
        }${params.pageSize ? `pageSize=${params.pageSize}&` : ""}${params.sortBy ? `sortBy=${params.sortBy}&` : ""
        }${params.sortDescending ? `sortDescending=${params.sortDescending}&` : ""
        }`
    );
};

const getCourtInfo = async (id) => {
    return await axios.get(`/courts/${id}`);
};

const putUpdateCourt = async (id, data) => {
    return await axios.put(`/courts/${id}`, data);
};

const deleteCourt = async (id) => {
    return await axios.delete(`/courts/${id}`);
};

export {
    postCreateCourt,
    getCourtList,
    getCourtInfo,
    putUpdateCourt,
    deleteCourt,
};