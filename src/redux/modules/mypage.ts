import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { userApis } from '../../apis';

interface mypageType {
  favorite: number;
  likes: number;
  activity: number;
}

const INITIAL_STATE: mypageType = {
  favorite: 0,
  likes: 0,
  activity: 0,
};

export const getUserInfo = createAsyncThunk(
  'mypageReducer/getUserInfo',
  async (data, thunkAPI) => {
    try {
      await userApis.info().then((response) => {
        const userInfo = {
          favorite: response.data.data.favorites_count,
          likes: response.data.data.posts_count,
          activity: response.data.data.likes_count,
        };
        thunkAPI.dispatch(setFavorLikeActivity(userInfo));
      });
    } catch (error) {
      console.log(error);
    }
  }
);

export const mypageSlice = createSlice({
  name: 'mypageReducer',
  initialState: INITIAL_STATE,
  reducers: {
    setFavorLikeActivity: (state, action: PayloadAction<mypageType>) => {
      return { ...state, ...action.payload };
    },
  },
});

export default mypageSlice;

export const { setFavorLikeActivity } = mypageSlice.actions;

const likeActionCreators = {
  getUserInfo,
};

export { likeActionCreators };
