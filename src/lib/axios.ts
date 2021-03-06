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
  config.headers!.withCredentials = true;
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

    // 441코드가 뜨면 refresh 토큰을 넣어서 access token을 재발급 받습니다.
    if (statusCode === 441) {
      try {
        const initialURL = originalRequest.url; // 기존 요청 변수에 저장
        const refreshToken = getRefreshTokenFromCookie();
        originalRequest.headers['Authorization'] = `Bearer ${refreshToken}`;
        originalRequest.url = '/api/user/reissue'; // access token 재발급 요청
        await axios(originalRequest).then(async (response) => {
          const accessToken = response.headers.access_token;
          const refreshToken = response.headers.refresh_token;
          setAccessTokenToCookie(accessToken);
          setRefreshTokenToCookie(refreshToken);
          // 토큰을 재발급 받으면 다시 요청을 하게 됩니다.
          originalRequest.url = initialURL;
          originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
          return await axios(originalRequest).then((response) => {
            //console.log('441 요청 response입니다 \n', response);
          });
        });
      } catch (error) {
        //console.log(error);
        return Promise.reject(error);
      }

      //console.log(responseData, originalRequest, statusCode);

      return Promise.reject(error);
    }

    //console.log(responseData, originalRequest, statusCode);

    return error;
  }
);

export default instance;
