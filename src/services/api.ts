import axios from "axios";
import useSWR from "swr";
const { REACT_APP_API } = process.env;

const api = axios.create({
  baseURL: REACT_APP_API,
});

api.interceptors.request.use(
  async (config) => {
    const url = await config?.url?.endsWith("login");
    const tokenUser = sessionStorage.getItem("@App:access_token");

    if (!url && tokenUser) {
      config.headers.Authorization = `Bearer ${tokenUser}`;
      config.headers.Accept = "application/json";
      config.headers = {
        "Content-Type": "application/x-www-form-urlencoded",
      };
    }

    return config;
  },
  (error) => {
    // I cand handle a request with errors here
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    // Do something with response data
    return response;
  },
  (error) => {
    // You can even test for a response code
    // and try a new request before rejecting the promise
    if (error.response.status === 401) {
      const requestConfig = error.config;
      return axios(requestConfig);
    }
    return Promise.reject(error);
  }
);

export default api;

export function useFetch<Data = any, Error = any>(url: string) {
  const { data, error } = useSWR<Data, Error>(url, async (url) => {
    const response = await api.get(url);
    return response.data.data;
  });

  return { data, error };
}
