import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { beansApis } from '../../apis';

const initialState = {
  beanlist: [{ bean_id: 0, bean_name: null, bean_description: null, type: 0 }],
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

export const beansSlice = createSlice({
  name: 'beansReducer',
  initialState,
  reducers: {
    saveBeansList: (state, action: PayloadAction<any>) => {
      state.beanlist = action.payload;
      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getBeansList.fulfilled, (state, action) => {
      state.isLoaded = true;
    });
  },
});

export const { saveBeansList } = beansSlice.actions;

export default beansSlice;
