import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { userApis } from '../../apis';
import instance from '../../lib/axios';
import {
  setAccessTokenToCookie,
  setRefreshTokenToCookie,
} from '../../utils/cookie';

const initialState = {
  nickname: '',
  isLogin: false,
};

export const getKakaoURL = createAsyncThunk(
  'user/login/kakao/url',
  async () => {
    try {
      await userApis.getKakaoURL().then((response) => {
        const url: string = response.data;
        console.log(url);
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
  async (code: string) => {
    try {
      await instance
        .get('/api/user/login/kakao/callback', {
          params: { code },
        })
        .then((response) => {
          const accessToken = response.headers.access_token;
          const refreshToken = response.headers.refresh_token;
          setAccessTokenToCookie(accessToken);
          setRefreshTokenToCookie(refreshToken);

          return;
        });
    } catch (err) {
      console.log(err);
      return;
    }
  }
);

export const auth = createAsyncThunk('user/auth', async () => {
  try {
    await userApis.auth().then((response) => {
      return;
    });
  } catch (err) {
    return;
  }
});

// export const user = createSlice({
// 	name: 'user',
// 	initialState,
// 	reducers: {
// 		authLogin: (_, action) => {
// 			sessionStorage.setItem('accessToken', action.payload.accessToken);
// 			sessionStorage.setItem('refreshToken', action.payload.refreshToken);
// 			instance.defaults.headers.common[
// 				'Authorization'
// 			] = `Bearer ${action.payload.accessToken}`;
// 		},
// 	},
// 	extraReducers: (builder) => {
// 		builder.addCase(signIn.fulfilled, (state, action) => {
// 			state.id = action.payload.id;
// 			state.name = action.payload.name;
// 			state.isLogin = true;
// 		});
// 		builder.addCase(getUserInfo.fulfilled, (state, action) => {
// 			state.id = action.payload.id;
// 			state.name = action.payload.name;
// 			state.isLogin = true;
// 		});
// 	},
// });

// export default user.reducer
