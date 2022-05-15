import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { userApis } from '../../apis';
import axios from 'axios';

const initialState = {};

export const loginKakao = createAsyncThunk('user/login/kakao', async () => {
  try {
    await userApis.loginKakao().then((response) => {
      const url: string = response.data;
      location.href = url;
      return;
    });
  } catch (err) {
    console.log(err);
    return;
  }
});

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

export const axiosGetPost = createAsyncThunk('test', async () => {
  return axios
    .get(
      'http://ec2-3-38-78-198.ap-northeast-2.compute.amazonaws.com/user/login/kakao'
    )
    .then((res) => {
      console.log(res);
      return res.data;
    })
    .catch((error) => console.log(error));
});
// const user = createSlice({
//   name: 'user',
//   reducers: {

//   }
// })

// export default user.reducer
