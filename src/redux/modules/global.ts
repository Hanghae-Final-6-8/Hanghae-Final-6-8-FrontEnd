import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
};

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    isLoading: (state) => {
      state.loading = true;
      return state;
    },
    isLoaded: (state) => {
      state.loading = false;
      return state;
    },
  },
});

export const { isLoading, isLoaded } = globalSlice.actions;

export default globalSlice;
