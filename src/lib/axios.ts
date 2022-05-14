import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { getCookie, setCookie } from '../utils/cookie';

// 임시로 구현하였습니다.

const baseURL = process.env.REACT_APP_BASE_URL;

const instance = axios.create({
  baseURL: baseURL,
  // headers: {
  //   ACCESS_TOKEN: ``,
  // },
});

const setHeaderAuthorization = (token: string) => {
  instance.defaults.headers.common['ACCESS_TOKEN'] = `Bearer ${token}`;
};

// const checkToken = (config: AxiosRequestConfig) => {};

instance.interceptors.request.use((config: AxiosRequestConfig) => {
  const token = getCookie();
  token && setHeaderAuthorization(token);
  return config;
});

instance.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log(response);
    return response;
  },
  (error) => {
    console.log(error);
    return error;
  }
);

export default instance;
