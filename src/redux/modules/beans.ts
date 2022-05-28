import { getBeansListByCafe } from './cafe';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { beansApis } from '../../apis';
import { useNavigate } from 'react-router-dom';

export interface beansType {
  beanlist: Array<any>;
  beansDetail: any;
  isLoaded: boolean;
  isMainLoaded: boolean;
  paging: number;
  isLoading: boolean;
  beanListLoadedLength: number;
}

const initialState: beansType = {
  beanlist: [],
  beansDetail: {
    acidity: 0,
    beanId: 0,
    beanName: null,
    beanImage: null,
    bitter: 0,
    body: 0,
    cafeId: 0,
    cafeLogoImage: null,
    cafeBackGroundImage: null,
    cafeName: '',
    cocoaFlavor: 0,
    description: '',
    floral: 0,
    fruitFlavor: 0,
    nutty: 0,
    nuttyFlavor: 0,
    sweetness: 0,
    type: 0,
    favoritesId: null,
    similar: [
      { beanId: 0, beanName: '', description: '', beanImage: '', type: 0 },
    ],
    isSimilarLoaded: false,
  },
  isLoaded: false,
  isMainLoaded: false,
  paging: 0,
  isLoading: false,
  beanListLoadedLength: 0,
};

export const getBeansList = createAsyncThunk(
  'beans/list',
  async (page: number, thunkAPI) => {
    thunkAPI.dispatch(isLoading(true));
    try {
      await beansApis.getBeansList(page).then((response) => {
        const beanList = response.data.data.content;
        thunkAPI.dispatch(saveBeansList({ beanList, page }));

        if (response.data.data.content.length !== 0) {
          thunkAPI.dispatch(setPageNum(++page));
        }

        thunkAPI.dispatch(isLoading(false));

        const beanListLoadedLength = response.data.data.content.length;

        thunkAPI.dispatch(setBeanListLoadedLength(beanListLoadedLength));

        return;
      });
    } catch (err) {
      return;
    }
  }
);

export const getBeansListType = createAsyncThunk(
  'beans/list/type',
  async (type: number, thunkAPI) => {
    try {
      await beansApis.getBeansListType(type).then((response) => {
        thunkAPI.dispatch(saveBeanseListByType(response.data.data.content));
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
      if (action.payload.page === 0) {
        state.beanlist = [];
      }
      state.beanlist = [...state.beanlist, ...action.payload.beanList];
      return state;
    },
    saveBeanseListByType: (state, action: PayloadAction<any>) => {
      state.isLoaded = false;
      state.paging = 0;
      state.beanlist = action.payload;
      return state;
    },
    saveBeansDetail: (state, action: PayloadAction<any>) => {
      state.beansDetail = action.payload;
      return;
    },
    isLoading: (state, action: PayloadAction<any>) => {
      state.isLoading = action.payload;
    },
    setPageNum: (state, action: PayloadAction<any>) => {
      state.paging = action.payload;
    },
    setBeanListLoadedLength: (state, action: PayloadAction<any>) => {
      state.beanListLoadedLength = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getBeansList.fulfilled, (state, action) => {
      state.isLoaded = true;
    });
    builder.addCase(searchBeans.fulfilled, (state, action) => {
      state.isLoaded = false;
    });
    builder.addCase(getBeansListByCafe.fulfilled, (state, action) => {
      state.isLoaded = false;
    });
  },
});

export const {
  saveBeansList,
  saveBeansDetail,
  saveBeanseListByType,
  isLoading,
  setPageNum,
  setBeanListLoadedLength,
} = beansSlice.actions;

export default beansSlice;
