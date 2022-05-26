import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { userApis } from '../../apis';
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

interface Update {
  nickname: string;
  profile_url: string;
}

const initialState = {
  nickname: '',
  isLogin: false,
  profile_url: '',
  tasteId: '',
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
  async (data: Login) => {
    try {
      const code = data.codeInput;
      await userApis.loginKakao(code).then((response) => {
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

export const getNaverURL = createAsyncThunk(
  'user/login/naver/url',
  async () => {
    try {
      await userApis.getNaverURL().then((response) => {
        const url: string = response.data;
        location.href = url;
        return;
      });
    } catch (err) {
      return;
    }
  }
);

export const loginNaver = createAsyncThunk(
  'user/login/naver',
  async (data: Login) => {
    try {
      const code = data.codeInput;
      await userApis.loginNaver(code).then((response) => {
        const accessToken = response.headers.access_token;
        const refreshToken = response.headers.refresh_token;
        setAccessTokenToCookie(accessToken);
        setRefreshTokenToCookie(refreshToken);
        return;
      });
    } catch (err) {
      return;
    }
  }
);

export const getGoogleURL = createAsyncThunk(
  'user/login/google/url',
  async () => {
    try {
      await userApis.getGoogleURL().then((response) => {
        const url: string = response.data;
        location.href = url;
        return;
      });
    } catch (err) {
      return;
    }
  }
);

export const loginGoogle = createAsyncThunk(
  'user/login/google',
  async (data: Login) => {
    try {
      const code = data.codeInput;
      await userApis.loginGoogle(code).then((response) => {
        const accessToken = response.headers.access_token;
        const refreshToken = response.headers.refresh_token;
        setAccessTokenToCookie(accessToken);
        setRefreshTokenToCookie(refreshToken);
        return;
      });
    } catch (err) {
      return;
    }
  }
);

// 유저의 로그인 여부를 판별합니다.
export const auth = createAsyncThunk('user/auth', async (_, thunkAPI) => {
  try {
    await userApis.auth().then((response) => {
      thunkAPI.dispatch(setUserInfo(response.data.data));
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

export const deleteUser = createAsyncThunk('user/delete', async () => {
  try {
    await userApis.delete().then((response) => {
      location.href = '../';
      return;
    });
  } catch (err) {
    return;
  }
});

export const update = createAsyncThunk('user/update', async (data: Update) => {
  try {
    await userApis.update(data).then((response) => {
      return;
    });
  } catch (err) {
    return;
  }
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<any>) => {
      state = action.payload;
      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginGoogle.fulfilled, (state, action) => {
      state.isLogin = true;
    });
    builder.addCase(loginNaver.fulfilled, (state, action) => {
      state.isLogin = true;
    });
    builder.addCase(loginKakao.fulfilled, (state, action) => {
      state.isLogin = true;
    });
    builder.addCase(auth.fulfilled, (state, action) => {
      state.isLogin = true;
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.isLogin = false;
    });
  },
});

export const { setUserInfo } = userSlice.actions;

export default userSlice;
