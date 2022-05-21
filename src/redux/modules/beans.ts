import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { beansApis } from '../../apis';

const initialState = {};

export const getBeansList = createAsyncThunk('beans/list', async () => {
  try {
    await beansApis.getBeansList().then((response) => {
      return;
    });
  } catch (err) {
    return;
  }
});
