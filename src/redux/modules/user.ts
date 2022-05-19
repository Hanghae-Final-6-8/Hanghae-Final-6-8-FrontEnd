import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { userApis } from '../../apis';
import instance from '../../lib/axios';
import {
  setAccessTokenToCookie,
  setRefreshTokenToCookie,
  removeCookies,
} from '../../utils/cookie';

interface Navigate {
  replace: boolean;
}
interface Login {
  codeInput: string;
  navigate: (to: string, state: Navigate) => void;
}

const initialState = {
  nickname: null,
  isLogin: false,
  //isLogin: true,
};

export const getKakaoURL = createAsyncThunk(
  'user/login/kakao/url',
  async () => {
    try {
      await userApis.getKakaoURL().then((response) => {
        const url: string = response.data;
        location.href = url;
        return;
      });
    } catch (err) {
      console.log(err);
      return;
    }
  }
);
export const loginKakao = createAsyncThunk(
  'user/login/kakao',
  async (codeInput: Login) => {
    try {
      const code = codeInput.codeInput;
      await instance
        .get('/api/user/login/kakao/callback', {
          params: { code },
        })
        .then((response) => {
          const accessToken = response.headers.access_token;
          const refreshToken = response.headers.refresh_token;
          setAccessTokenToCookie(accessToken);
          setRefreshTokenToCookie(refreshToken);

          codeInput.navigate('/main', { replace: true });

          return;
        });
    } catch (err) {
      console.log(err);
      return;
    }
  }
);

// 유저의 로그인 여부를 판별합니다.
export const auth = createAsyncThunk('user/auth', async () => {
  try {
    await userApis.auth().then((response) => {
      // const user = {
      //   nickname: response.data.nickname,
      // };
      return;
    });
  } catch (err) {
    return;
  }
});

export const logout = createAsyncThunk('user/logout', async () => {
  try {
    await userApis.logout().then((response) => {
      removeCookies();
      location.href = '../';
      return;
    });
  } catch (err) {
    removeCookies();
    return;
  }
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginKakao.fulfilled, (state, action) => {
      state.isLogin = true;
    });
    builder.addCase(auth.fulfilled, (state, action) => {
      state.isLogin = true;
    });
  },
});

export default userSlice;
