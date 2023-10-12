import axios, { AxiosInstance } from "axios";

const apiClient: AxiosInstance = axios.create({
  baseURL: "http://localhost:5010/api",
  headers: {
    "Content-type": "application/json",
  },
});

export default apiClient;
