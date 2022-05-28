import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { favoriteApis } from '../../apis';

const initialState = {
  beanlist: [
    {
      beanId: 0,
      beanName: '',
      description: '',
      type: 0,
      beanImage: '',
    },
  ],
};

export const getFavoriteList = createAsyncThunk(
  'favorite/get',
  async (_, thunkAPI) => {
    try {
      await favoriteApis.getFavoriteList().then((response) => {
        thunkAPI.dispatch(saveBeansFavoriteList(response.data.data));
        return;
      });
    } catch (err) {
      return;
    }
  }
);

export const addFavoriteList = createAsyncThunk(
  'favorite/add',
  async (data: number) => {
    try {
      await favoriteApis.addFavoriteList(data).then((response) => {
        return;
      });
    } catch (err) {
      return;
    }
  }
);

export const favoriteSlice = createSlice({
  name: 'favoriteReducer',
  initialState,
  reducers: {
    saveBeansFavoriteList: (state, action: PayloadAction<any>) => {
      state.beanlist = action.payload;
      return;
    },
  },
  extraReducers: () => {
    //
  },
});

export const { saveBeansFavoriteList } = favoriteSlice.actions;

export default favoriteSlice;
