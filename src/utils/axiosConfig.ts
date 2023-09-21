import axios from "axios";

const axiosIntances = () => {
  const Axios = axios.create({
    baseURL: "https://dashboard-backend-production.up.railway.app",
  });

  Axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  Axios.defaults.timeout = 4500;
  return Axios;
};

export default axiosIntances;
