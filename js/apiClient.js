import axios from "axios";

const apiBaseURL = import.meta.env.VITE_BACKEND_URL || "/api";

export const apiClient = axios.create({
  baseURL: apiBaseURL,
  timeout: 15_000,
});
