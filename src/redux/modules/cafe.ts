import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { cafeApis } from '../../apis';
import { saveBeansList } from './beans';
import { saveTasteList } from './taste';

const initialState = {
  cafeList: [{ cafeId: 0, cafeName: '' }],
  isLoaded: false,
};

export const getCafeList = createAsyncThunk(
  'cafe/list',
  async (_, thunkAPI) => {
    try {
      await cafeApis.getCafeList().then((response) => {
        thunkAPI.dispatch(saveCafeList(response.data.data));
        return;
      });
    } catch (err) {
      return;
    }
  }
);

export const getBeansListByCafe = createAsyncThunk(
  'cafe/beans',
  async (data: number, thunkAPI) => {
    try {
      await cafeApis.getBeansListByCafe(data).then((response) => {
        thunkAPI.dispatch(saveBeansList(response.data.data));
        return;
      });
    } catch (err) {
      return;
    }
  }
);

export const getBeansListByCafeMain = createAsyncThunk(
  'cafe/beans/total',
  async (_, thunkAPI) => {
    try {
      await cafeApis.getBeansListByCafeMain().then((response) => {
        return;
      });
    } catch (err) {
      return;
    }
  }
);

export const cafeSlice = createSlice({
  name: 'cafeReducer',
  initialState,
  reducers: {
    saveCafeList: (state, action: PayloadAction<any>) => {
      state.cafeList = action.payload;
      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCafeList.fulfilled, (state, action) => {
      state.isLoaded = true;
    });
  },
});

export const { saveCafeList } = cafeSlice.actions;

export default cafeSlice;
