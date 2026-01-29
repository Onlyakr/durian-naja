import axios, { AxiosResponse, AxiosError } from "axios";
const BASE_URL = process.env.NEXT_PUBLIC_API_URL

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, 
});

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response && error.response.status === 401) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("user");
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;