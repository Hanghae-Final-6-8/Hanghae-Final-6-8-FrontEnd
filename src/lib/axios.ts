import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import {
  getAccessTokenFromCookie,
  getRefreshTokenFromCookie,
  removeCookies,
} from '../utils/cookie';
import { setMoveToLogin } from '../utils/setMoveToLogin';

const baseURL = process.env.REACT_APP_BASE_URL;
const accessToken = getAccessTokenFromCookie();

const instance = axios.create({
  baseURL: baseURL,
  headers: {
    withCredentials: true,
    ACCESS_TOKEN: `Bearer ${accessToken}`,
  },
  timeout: 3000,
});

instance.interceptors.request.use((config: AxiosRequestConfig) => {
  const accessToken = getAccessTokenFromCookie();
  config.headers!['ACCESS_TOKEN'] = `Bearer ${accessToken}`;
  console.log('request config입니다 \n', config);
  return config;
});

instance.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log('response입니다 \n', response);
    return response;
  },
  (error) => {
    const {
      data: responseData,
      config: originalRequest,
      status: statusCode,
    } = error.response;
    if (statusCode === 440) {
      removeCookies();
      setMoveToLogin();
      return Promise.reject(error);
    }

    if (statusCode === 441) {
      const refreshToken = getRefreshTokenFromCookie();
      originalRequest.headers['REFRESH_TOKEN'] = `Bearer ${refreshToken}`;
      return axios(originalRequest);
    }
    if (statusCode === 442) {
      const accessToken = getAccessTokenFromCookie();
      originalRequest.headers['ACCESS_TOKEN'] = `Bearer ${accessToken}`;
      return axios(originalRequest);
    }
    if (statusCode === 443) {
      removeCookies();
      setMoveToLogin();
      return Promise.reject(error);
    }

    console.log(responseData, originalRequest, statusCode);

    return error;
  }
);

export default instance;
