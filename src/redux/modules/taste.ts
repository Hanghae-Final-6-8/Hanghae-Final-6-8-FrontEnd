import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { tasteApis } from '../../apis';
import instance from '../../lib/axios';

const INITIAL_STATE = {
  acidity: 3,
  beanId: 48,
  beanName: '오리지널 원두 블렌드',
  bitter: 2,
  body: 2,
  cafeId: 29,
  cafeImage: null,
  cafeName: '감성커피',
  cocoaFlavor: 0,
  description:
    '좀 더 풍성해진 입안 감촉과 (산미와 단맛)의 조화로운 밸런스로 산비가 다소 높을 순 있지만 한 잔을 다 비우기에 거슬리지 않은 산뜻한 느낌의 원두',
  floral: 1,
  fruitFlavor: 1,
  nutty: 1,
  nuttyFlavor: 0,
  sweetness: 2,
  type: 2,
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

export const tasteSlice = createSlice({
  name: 'tasteReducer',
  initialState: INITIAL_STATE,
  reducers: {
    saveTasteList: (state, action: PayloadAction<any>) => {
      state = action.payload;
      return state;
    },
  },
  extraReducers: () => {
    //
  },
});

export const { saveTasteList } = tasteSlice.actions;

export default tasteSlice;
