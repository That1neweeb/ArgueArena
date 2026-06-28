import axios from "axios";

export const createClient = (baseURL) => {
  const client = axios.create({ baseURL });

  // Add token automatically
  client.interceptors.request.use((config) => {
    const token = localStorage.getItem("access_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });

  // Central error handling
  client.interceptors.response.use(
    (res) => res,
    (err) => {
      
      const message =
        err.response?.data?.message ||
        err.response?.data?.err ||
        "Server err"; 
      
      err.message = message;
      return Promise.reject(err);
    }
  );

  return client;
};