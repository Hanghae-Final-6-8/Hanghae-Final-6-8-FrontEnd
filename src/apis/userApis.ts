import instance from '../lib/axios';

export const userApis = {
  getKakaoURL: () => instance.get('/api/user/login/kakao'),
  // loginKako는 임시로 빼서 구현했습니다. -> 추후 리팩토링 예정
  loginKakao: (code: string) => {
    return instance.get('/api/user/login/kakao/callback', {
      params: { code },
    });
  },
  getNaverURL: () => instance.get('/api/user/login/naver'),
  loginNaver: (code: string) =>
    instance.get('/api/user/login/kakao/callback', {
      params: { code },
    }),
  getGoogleURL: () => instance.get('/api/user/login/google'),
  loginGoogle: (code: string) =>
    instance.get('/api/user/login/google/callback', {
      params: { code },
    }),
  logout: () => instance.get('/api/user/logout'),
  reissue: () => instance.get('/api/user/reissue'),
  update: (userdata: { nickname: string; profile_url: string }) =>
    instance.patch('/api/user/update', userdata),
  delete: () => instance.post('/api/user/delete'),
  info: () => instance.get('/api/user/info', {}),
  // 인증부분 API 완료하였으나 프로필url, nickname을 따로 저장해줘야 합니다.
  auth: () => instance.get('/api/user/auth'),
};
