import axios from "../utils/axiosCustomize";

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

const putUpdateCourt = async (id, data, file = null) => {
    const formData = new FormData();

    // Append the court data
    Object.entries(data).forEach(([key, value]) => {
        if (key !== 'id' && key !== 'sportType' && key !== 'area') {
            formData.append(key, value);
        }
    });

    // If a file is provided, append it; otherwise, include a placeholder file
    if (file) {
        formData.append('file', file);
    } else {
        formData.append('file', ''); // Placeholder file
    }

    return await axios.put(`/courts/${id}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
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
