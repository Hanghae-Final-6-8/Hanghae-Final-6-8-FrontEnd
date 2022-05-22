import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { beansApis } from '../../apis';
import { useNavigate } from 'react-router-dom';

const initialState = {
  beanlist: [
    {
      beanId: 0,
      beanName: null,
      description: null,
      type: 0,
      beanImage: null,
    },
  ],
  beansDetail: [
    {
      acidity: 0,
      beanId: 0,
      beanName: null,
      beanImage: null,
      bitter: 0,
      body: 0,
      cafeId: 0,
      cafeLogoImage: null,
      cafeBackGroundImage: null,
      cafeName: null,
      cocoaFlavor: 0,
      description: null,
      floral: 0,
      fruitFlavor: 0,
      nutty: 0,
      nuttyFlavor: 0,
      sweetness: 0,
      type: 0,
    },
  ],
  isLoaded: false,
};

export const getBeansList = createAsyncThunk(
  'beans/list',
  async (_, thunkAPI) => {
    try {
      await beansApis.getBeansList().then((response) => {
        thunkAPI.dispatch(saveBeansList(response.data.data));
        return;
      });
    } catch (err) {
      return;
    }
  }
);

export const searchBeans = createAsyncThunk(
  'beans/search',
  async (data: string, thunkAPI) => {
    try {
      await beansApis.searchBeans(data).then((response) => {
        thunkAPI.dispatch(saveBeansList(response.data.data));
        return;
      });
    } catch (err) {
      return;
    }
  }
);

export const detailBeans = createAsyncThunk(
  'beans/detail',
  async (data: number, thunkAPI) => {
    //const navigate = useNavigate();
    try {
      await beansApis.detailBeans(data).then((response) => {
        thunkAPI.dispatch(saveBeansDetail(response.data.data));
        //navigate(`../beans/${data}`);
        return;
      });
    } catch (err) {
      return;
    }
  }
);

export const beansSlice = createSlice({
  name: 'beansReducer',
  initialState,
  reducers: {
    saveBeansList: (state, action: PayloadAction<any>) => {
      state.beanlist = action.payload;
      return state;
    },
    saveBeansDetail: (state, action: PayloadAction<any>) => {
      state.beansDetail = action.payload;
      return;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getBeansList.fulfilled, (state, action) => {
      state.isLoaded = true;
    });
    builder.addCase(searchBeans.fulfilled, (state, action) => {
      state.isLoaded = false;
    });
  },
});

export const { saveBeansList, saveBeansDetail } = beansSlice.actions;

export default beansSlice;
