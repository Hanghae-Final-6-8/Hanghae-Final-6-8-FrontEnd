import { Cookies } from 'react-cookie';

const cookies = new Cookies();

// 백에서 자동으로 jwt 토큰을 넣어주지 않을 경우를 위해 setCookie를 만들어두었습니다.
export const setAccessTokenToCookie = (value: string) => {
  return cookies.set('Authorization', value, {
    path: '/',
  });
};

export const setRefreshTokenToCookie = (value: string) => {
  return cookies.set('REFRESH_TOKEN', value, {
    path: '/',
  });
};

// 반환 값이 필요하기 때문에 return이 필요합니다.
export const getAccessTokenFromCookie = () => {
  return cookies.get('Authorization');
};

export const getRefreshTokenFromCookie = () => {
  return cookies.get('REFRESH_TOKEN');
};

export const removeCookies = () => {
  cookies.remove('ACCESS_TOKEN');
  cookies.remove('Authorization');
  cookies.remove('REFRESH_TOKEN');
};
