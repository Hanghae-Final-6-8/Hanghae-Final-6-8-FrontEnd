import { removeCookies } from './cookie';

export const setMoveToLogin = () => {
  alert('다시 로그인 해주세요!');
  removeCookies();
  location.href = '../';
};
