import axios from "axios";
import { serverURL } from "./api/authApi";

// Ensure global Axios default carries credentials for all requests
axios.defaults.withCredentials = true;

export const axiosInstance = axios.create({
  baseURL: serverURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.defaults.withCredentials = true;

export { axios };
export default axiosInstance;
