import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
};

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {},
});

export default globalSlice;
