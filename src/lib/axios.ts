import axios from 'axios';
import { getCookie, setCookie } from '../utils/cookie';

// 임시로 구현하였습니다.

const baseURL = process.env.REACT_APP_BASE_URL;

const instance = axios.create({
  baseURL: baseURL,
});

const setHeaderAuthorization = (token: string) => {
  instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

instance.interceptors.request.use((config: any) => {
  const token = getCookie();
  token && setHeaderAuthorization(token);
  return config;
});

export default instance;
