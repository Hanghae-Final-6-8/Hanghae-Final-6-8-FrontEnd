import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { tasteApis } from '../../apis';
import instance from '../../lib/axios';

const initialState = {};

interface TasteList {
  surveyResult: {
    acidity: number;
    body: number;
    sweetness: number;
    bitter: number;
    nutty: number;
    floral: number;
    fruit_flavor: number;
    cocoa_flavor: number;
    nutty_flavor: number;
  };
  navigate?: (to: string) => void;
}

export const postTasteSurvey = createAsyncThunk(
  'taste/tests',
  async (tasteList: TasteList, { rejectWithValue }) => {
    try {
      await tasteApis
        .postTasteSurvey(tasteList.surveyResult)
        .then((reponse) => {
          return;
        });
    } catch (err: any) {
      console.log(err);
      return rejectWithValue(err.response.data);
    }
  }
);
