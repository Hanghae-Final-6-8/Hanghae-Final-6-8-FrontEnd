import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { userApis } from '../../apis';
import instance from '../../lib/axios';

const initialState = {};

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
          console.log(response);
        });
    } catch (err) {
      console.log(err);
      return;
    }
  }
);

// export const loginKakao = createAsyncThunk('user/login/kakao', async (code) => {
//   try{
//     await userApis.loginKakao(code).then((response) => {
//       console.log(response)
//       return
//     })
//   } catch (err) {
//     console.log(err)
//     return
//   }
// })

export const auth = createAsyncThunk('user/auth', async () => {
  try {
    await userApis.auth('data').then((response) => {
      return;
    });
  } catch (err) {
    console.log(err);
    return;
  }
});

// const user = createSlice({
//   name: 'user',
//   reducers: {

//   }
// })

// export default user.reducer
