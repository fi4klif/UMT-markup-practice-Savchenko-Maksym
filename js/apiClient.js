import axios from "axios";

const apiBaseURL = import.meta.env.VITE_API_KEY || "/api";

export const apiClient = axios.create({
  baseURL: apiBaseURL,
  timeout: 15_000,
});
