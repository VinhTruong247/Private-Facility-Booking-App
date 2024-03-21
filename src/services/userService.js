import axios from "../utils/axiosCustomize";

const postCreateUser = async (data) => {
  return await axios.post("/users", data);
};

const getAllUsers = async (params) => {
  try {
    const response = await axios.get(
      `/users?${params.username ? `username=${params.username}&` : ""}${
        params.email ? `email=${params.email}&` : ""
      }${params.phone ? `phone=${params.phone}&` : ""}${
        params.isActive !== undefined ? `isActive=${params.isActive}&` : ""
      }${params.roleId ? `roleId=${params.roleId}&` : ""}${
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

const getUserInfo = async (id) => {
  return await axios.get(`/users/${id}`);
};

const putUpdateUser = async (id, data) => {
  const { id: userId, email, isActive, role, ...updatedUserData } = data;

  try {
    return await axios.put(`/users/${id}`, updatedUserData);
  } catch (error) {
    throw error; // Propagate the error to the caller for handling
  }
};

export { postCreateUser,getAllUsers,getUserInfo,putUpdateUser };
