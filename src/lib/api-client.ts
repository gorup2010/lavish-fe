import axios, { AxiosResponse } from 'axios';


const onResponseSuccess = (response: AxiosResponse) => {
  return response.data;
}

export const api = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}`,
  withCredentials: true,
});

// TODO: change name
export const api2 = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}`,
  withCredentials: true,
});

api.interceptors.response.use(onResponseSuccess);
api2.interceptors.response.use(onResponseSuccess);