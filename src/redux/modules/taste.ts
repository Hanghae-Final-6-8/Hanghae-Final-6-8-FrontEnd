import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { tasteApis } from '../../apis';
import instance from '../../lib/axios';

const INITIAL_STATE = {};

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
  navigate: (to: string) => void;
}

export const postTasteSurvey = createAsyncThunk(
  'taste/tests',
  async (tasteList: TasteList, thunkAPI) => {
    try {
      await tasteApis
        .postTasteSurvey(tasteList.surveyResult)
        .then((reponse) => {
          //tasteList.navigate('/main');
          //console.log(thunkAPI);
          //thunkAPI.dispatch(saveTasteList);
          return;
        });
    } catch (err: any) {
      console.log(err);
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const tasteSlice = createSlice({
  name: 'tasteReducer',
  initialState: INITIAL_STATE,
  reducers: {
    saveTasteList: (state, action: PayloadAction<any>) => {
      console.log(state);
      console.log(action);
      return;
    },
  },
  extraReducers: () => {
    //
  },
});

export const { saveTasteList } = tasteSlice.actions;

export default tasteSlice;
