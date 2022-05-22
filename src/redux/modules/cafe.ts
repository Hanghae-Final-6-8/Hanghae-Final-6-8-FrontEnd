import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { cafeApis } from '../../apis';

const initialState = {};

export const getCafeList = createAsyncThunk('cafe/list', async () => {
  try {
    await cafeApis.getCafeList().then((response) => {
      return;
    });
  } catch (err) {
    return;
  }
});

export const cafeSlice = createSlice({
  name: 'cafeReducer',
  initialState,
  reducers: {},
  extraReducers: () => {
    //
  },
});

export default cafeSlice;
