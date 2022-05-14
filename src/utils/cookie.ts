import { Cookies } from 'react-cookie';

const cookies = new Cookies();

// 백에서 자동으로 jwt 토큰을 넣어주지 않을 경우를 위해 setCookie를 만들어두었습니다.
export const setCookie = (value: string) => {
  return cookies.set('token', value);
};

// 반환 값이 필요하기 때문에 return이 필요합니다.
export const getCookie = () => {
  return cookies.get('token');
};

export const removeCookie = () => {
  cookies.remove('token');
};
