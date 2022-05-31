import { removeCookies } from './cookie';

export const setMoveToLogin = () => {
  removeCookies();
  location.href = '../';
};
