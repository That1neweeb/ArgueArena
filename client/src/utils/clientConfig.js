import axios from "axios";

export const createClient = (baseURL) => {
  const client = axios.create({ baseURL });

  //Add token automatically
  client.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });

  // Central error handling
  client.interceptors.response.use(
    (response) => response,
    (error) => {
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Server error";

      return Promise.reject(new Error(message));
    }
  );

  return client;
};