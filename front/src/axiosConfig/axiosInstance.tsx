// axiosInstance.js
import axios from "axios";
import {logout} from "../services/Authentication/AuthenticationService";

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_AXIOS_BASE_URL,
  timeout: process.env.REACT_APP_AXIOS_TIMEOUT
    ? parseInt(process.env.REACT_APP_AXIOS_TIMEOUT)
    : 10000,
});

export const axiosMediaInstance = axios.create({
  baseURL: process.env.REACT_APP_AXIOS_BASE_URL_MEDIA,
  timeout: process.env.REACT_APP_AXIOS_TIMEOUT
    ? parseInt(process.env.REACT_APP_AXIOS_TIMEOUT)
    : 10000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  },
);

/**
 * Executed before each request
 *
 * Following cases are handled:
 * - 500 ERROR FROM SERVER
 * - 401 ERROR FROM SERVER
 * - DEFAULT ERROR
 *
 * TODO: Handle token expiration
 */
axiosInstance.interceptors.response.use(
  (response) => {
    // do something with the response data
    return response;
  },
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 500:
          console.error("ERROR: 500 from server: ", error.response);
          break;
        case 401:
          console.error("ERROR: 401 from server: ", error.response);
          logout();
          break;
        default:
          console.error("ERROR: ", error.response, error.response.status);
          break;
      }
    } else {
      // The request was made but no response was received
      // Add alert to the list of alerts

      console.error(
        "ERROR: ",
        error.message,
        "REQUEST: ",
        error?.request?._url,
      );
    }
    return Promise.reject(error);
  },
);
