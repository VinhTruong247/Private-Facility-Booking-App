import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  userInfo: {
    id: 3,
    username: "",
    email: "",
    role: "",
  },
  accessToken: "",
  refreshToken: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, { payload }) => {
      state.isAuthenticated = true;
      state.userInfo = {
        ...payload.userCredentials,
      };
      state.accessToken = payload.accessToken;
      state.refreshToken = payload.refreshToken;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.userInfo = initialState.userInfo;
      state.accessToken = "";
      state.refreshToken = "";
    },
    update: (state, { payload }) => {
      delete payload.password;
      state.userInfo = {
        ...state.userInfo,
        ...payload,
      };
    },

    updateToken: (state, { payload }) => {
      state.accessToken = payload.accessToken;
      state.refreshToken = payload.refreshToken;
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout, update, updateToken } = authSlice.actions;

export default authSlice.reducer;
