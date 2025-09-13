import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT,
});

api.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    // Do something with request errora
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  function (response) {
    return response;
  }
  /*
  function (error) {
    if (typeof error.response !== "undefined") {
      //Setup Generic Response Messages

      if (error.response.status === 401) {
      }

      if (error.response.status === 403) {
      }

      if (error.response.status === 404) {
      }
      if (error.response.status === 405) {
      }
      if (error.response.status === 422) {
      }
      if (error.response.status === 500) {
      }
    }
    return Promise.reject(error);
  }
    */
);
