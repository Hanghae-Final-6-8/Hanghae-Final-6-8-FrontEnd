import {
  setAccessTokenToCookie,
  setRefreshTokenToCookie,
} from './../utils/cookie';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import {
  getAccessTokenFromCookie,
  getRefreshTokenFromCookie,
  removeCookies,
} from '../utils/cookie';
import { setMoveToLogin } from '../utils/setMoveToLogin';
import { useEffect } from 'react';

const baseURL = process.env.REACT_APP_BASE_URL;

const instance = axios.create({
  baseURL: baseURL,
  timeout: 3000,
});

instance.interceptors.request.use((config: AxiosRequestConfig) => {
  const accessToken = getAccessTokenFromCookie();
  config.headers!['Content-Type'] = 'application/json; charset=utf-8';
  config.headers!['Access-Control-Allow-Origin'] = '*';
  config.headers!['Access-Control-Allow-Credentials'] = true;
  config.headers!['Authorization'] = `Bearer ${accessToken}`;
  (config.headers!.withCredentials = true),
    console.log('request config입니다 \n', config);
  return config;
});

/****************************************************************************
 * localhost에서 작업을 위한 임시 처리 - 홈페이지에서 쿠키 긁어와서 넣으면 됩니다.
 * 1. 홈페이지 접속 후 로그인
 * 2. Application에서 쿠키를 복사해서 아래에 입력해줍니다.
 * 3. 아래 주석 처리 된 부분을 '주석 해제' -> '저장' 1회
 * 4. 그후 다시 '주석 처리' -> '쿠키 삭제' -> '저장' 1회
 * 5. 이런 식으로 하면 됩니다.
 * 6. 임시적으로 로컬에서 작업을 하기 위해 이런식으로 하고 있습니다.
 ***************************************************************************/
// setAccessTokenToCookie(
//   ''
// );
// setRefreshTokenToCookie(
//   ''
// );

instance.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log('response입니다 \n', response);
    return response;
  },
  async (error) => {
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
      //originalRequest.headers['Authorization'] = `Bearer ${refreshToken}`;
      //instance.headers[]

      // const accessToken = response.headers.access_token;
      // const refreshToken = response.headers.refresh_token;
      // setAccessTokenToCookie(accessToken);
      // setRefreshTokenToCookie(refreshToken);

      //await axios(originalRequest)

      console.log(responseData, originalRequest, statusCode);

      return Promise.reject(error);
    }

    console.log(responseData, originalRequest, statusCode);

    return error;
  }
);

export default instance;
