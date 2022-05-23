import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { favoriteApis } from '../../apis';

const initialState = {};

export const getFavoriteList = createAsyncThunk('favorite/get', async () => {
  try {
    await favoriteApis.getFavoriteList().then((response) => {
      return;
    });
  } catch (err) {
    return;
  }
});

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
    //
  },
  extraReducers: () => {
    //
  },
});

export default favoriteSlice;
