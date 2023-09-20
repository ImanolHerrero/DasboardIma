import axios from "axios";

const axiosIntances = () => {
  const Axios = axios.create({
    baseURL: "http://ec2-18-221-249-255.us-east-2.compute.amazonaws.com",
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
