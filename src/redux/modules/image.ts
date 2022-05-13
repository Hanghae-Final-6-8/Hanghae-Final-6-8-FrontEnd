import { createSlice } from '@reduxjs/toolkit';

export interface ImageState {
  image_url: string;
}

const INITIAL_STATE: ImageState = {
  image_url: '',
};

export const imageSlice = createSlice({
  name: 'imageReducer',
  initialState: INITIAL_STATE,
  reducers: {
    // setPreview: (state, action: PayloadAction<ArrayBuffer>) => {
    //   console.log(action.payload);
    //   return { ...state, preview: action.payload };
    // },
  },
});

export default imageSlice;
