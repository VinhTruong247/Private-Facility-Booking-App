import axios from "axios";

const instance = axios.create({
  // baseURL: "http://localhost:8888/",
  baseURL: "https://sportscape.onrender.com/api/v1"
});

instance.defaults.withCredentials = true;
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data

    return response.data ? response.data : response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const status = error.response?.status || 500;
    // we can handle global errors here
    switch (status) {
      // authentication (token related issues)
      case 401: {
        return error.response?.data ? error.response.data : error;
      }

      // generic api error (server related) unexpected
      default: {
        return error.response?.data ? error.response.data : error;
      }
    }
  }
);

export default instance;
