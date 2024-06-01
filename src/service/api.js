import axios from "axios";

axios.defaults.baseURL = "http://refotib6.beget.tech/api/";

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("Token");
  const auth = token ? `Bearer ${token}` : "";

  config.headers.Authorization = auth;
  return config;
});

export default axios;
