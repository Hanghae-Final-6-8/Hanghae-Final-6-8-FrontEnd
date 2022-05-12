import instance from '../lib/axios';

// 임시로 등록하였습니다.
// header에 ACCESS_TOKEN 보내는 부분은 수정이 무조건적으로 필요합니다!
export const userApis = {
  loginKakao: () => instance.get('/api/user/login/kakao'),
  loginNaver: () => instance.get('/api/user/login/naver'),
  loginGoogle: () => instance.get('/api/user/login/google'),
  logout: (token: string) =>
    instance.post('/api/user/logout', {
      headers: {
        ACCESS_TOKEN: `Bearer ${token}`,
      },
    }),
  update: (token: string) =>
    instance.patch('/api/user/update', {
      headers: {
        ACCESS_TOKEN: `Bearer ${token}`,
        'content-type': 'multipart/form-data',
      },
    }),
  info: (token: string) =>
    instance.get('/api/user/info', {
      headers: {
        ACCESS_TOKEN: `Bearer ${token}`,
      },
    }),
};
