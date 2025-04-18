import axios, { AxiosResponse } from 'axios';


const onResponseSuccess = (response: AxiosResponse) => {
  return response.data;
}

export const api = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}`,
  withCredentials: true,
});

export const authApi = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}`,
  withCredentials: true,
});

api.interceptors.response.use(onResponseSuccess);
authApi.interceptors.response.use(onResponseSuccess);