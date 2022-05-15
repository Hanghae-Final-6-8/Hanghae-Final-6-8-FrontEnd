import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { getAccessTokenFromCookie } from '../utils/cookie';

// 임시로 구현하였습니다.

const baseURL = process.env.REACT_APP_BASE_URL;

const instance = axios.create({
  baseURL: baseURL,
});

const setHeaderAccessToken = (token: string) => {
  instance.defaults.headers.common['ACCESS_TOKEN'] = `Bearer ${token}`;
};

const setHeaderRefreshToken = (token: string) => {
  instance.defaults.headers.common['REFRESH_TOKEN'] = `Bearer ${token}`;
};

// const checkToken = (config: AxiosRequestConfig) => {};

instance.interceptors.request.use((config: AxiosRequestConfig) => {
  const accessToken = getAccessTokenFromCookie();
  accessToken && setHeaderAccessToken(accessToken);
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
