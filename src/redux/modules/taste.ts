import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { tasteApis } from '../../apis';
import { removeLocalStorage } from '../../utils/localstorage';

const initialState = {
  acidity: 0,
  beanId: 0,
  beanName: null,
  bitter: 0,
  body: 0,
  cafeId: 0,
  cafeImage: null,
  cafeName: null,
  cocoaFlavor: 0,
  description: null,
  floral: 0,
  fruitFlavor: 0,
  nutty: 0,
  nuttyFlavor: 0,
  sweetness: 0,
  type: 0,
  similar: [
    { beanId: 0, beanName: null, description: null, type: 0 },
    { beanId: 0, beanName: null, description: null, type: 0 },
    { beanId: 0, beanName: null, description: null, type: 0 },
    { beanId: 0, beanName: null, description: null, type: 0 },
  ],
};

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
        .then((response) => {
          thunkAPI.dispatch(saveTasteList(response.data.data));
          removeLocalStorage('surveyResult');
          // 일부러 시간을 끄는 용도로 사용했습니다.
          setTimeout(() => {
            tasteList.navigate('/main');
          }, 1500);
          return;
        });
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const getTasteSurvey = createAsyncThunk(
  'taste/tests/result',
  async (_, thunkAPI) => {
    try {
      await tasteApis.getTasteSurvey().then((response) => {
        thunkAPI.dispatch(saveTasteList(response.data.data));
        return;
      });
    } catch (err: any) {
      console.log(err);
      return;
    }
  }
);

export const getSimilarBeans = createAsyncThunk(
  'taste/similar',
  async (_, thunkAPI) => {
    try {
      await tasteApis.getSimilarBeans().then((response) => {
        thunkAPI.dispatch(saveSimilarList(response.data.data));
        return;
      });
    } catch (err) {
      return;
    }
  }
);

export const tasteSlice = createSlice({
  name: 'tasteReducer',
  initialState,
  reducers: {
    saveTasteList: (state, action: PayloadAction<any>) => {
      state = action.payload;
      return state;
    },
    saveSimilarList: (state, action: PayloadAction<any>) => {
      state.similar = action.payload;
      return state;
    },
  },
  extraReducers: () => {
    //
  },
});

export const { saveTasteList, saveSimilarList } = tasteSlice.actions;

export default tasteSlice;
