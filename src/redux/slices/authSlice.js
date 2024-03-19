import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  user: {
    id: "",
    username: "",
    email: "",
    role: "",
  },
  accessToken: "",
  resfreshToken: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, { payload }) => {
      state.isAuthenticated = true;
      state.user = {
        ...payload.userCredentials,
      };
      state.accessToken = payload.accessToken;
      state.resfreshToken = payload.resfreshToken;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = initialState.user;
      state.accessToken = "";
      state.resfreshToken = "";
    },
    update: (state, { payload }) => {
      delete payload.password;
      state.user = {
        ...state.user,
        ...payload,
      };
    },

    updateToken: (state, { payload }) => {
      state.accessToken = payload.accessToken;
      state.resfreshToken = payload.refreshToken;
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout, update, updateToken } = authSlice.actions;

export default authSlice.reducer;