import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { tasteApis } from '../../apis';
import instance from '../../lib/axios';

const initialState = {};

export const postTasteSurvey = createAsyncThunk(
  'taste/tests',
  async (
    tasteList: {
      acidity: number;
      body: number;
      sweetness: number;
      bitter: number;
      nutty: number;
      floral: number;
      fruit_flavor: number;
      cocoa_flavor: number;
      nutty_flavor: number;
    },
    { rejectWithValue }
  ) => {
    try {
      await tasteApis.postTasteSurvey(tasteList).then((reponse) => {
        console.log(reponse);
        return;
      });
    } catch (err: any) {
      console.log(err);
      return rejectWithValue(err.response.data);
    }
  }
);
