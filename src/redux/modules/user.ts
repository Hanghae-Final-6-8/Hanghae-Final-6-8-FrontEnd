import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { setCookie, getCookie, removeCookie } from './../../utils/cookie';
import { userApis } from '../../apis';

const initialState = {};

export const loginKakao = createAsyncThunk('user/login/kakao', async () => {
  try {
    await userApis.loginKakao().then((response) => {
      console.log(response);
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
