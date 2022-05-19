import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface mypageType {
  userActivity: object;
}

const INITIAL_STATE: mypageType = {
  userActivity: {
    favorite: 0,
    likes: 0,
    activity: 0,
  },
};

export const mypageSlice = createSlice({
  name: 'mypageReducer',
  initialState: INITIAL_STATE,
  reducers: {
    // setActivity: (state, action) => {
    //   return { ...userActivity,...actoin };
    // },
  },
});

export default mypageSlice;

// export const { addLikes } = mypageSlice.actions;

// const likeActionCreators = {
//   axiosAddLike,
//   axiosDeleteLike,
// };

// export { likeActionCreators };
