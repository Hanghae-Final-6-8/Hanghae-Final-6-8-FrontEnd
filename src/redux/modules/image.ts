import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ImageState {
  image_url: string;
  uploading: boolean;
  preview: ArrayBuffer;
}

const INITIAL_STATE: ImageState = {
  image_url: '',
  uploading: false,
  preview: new Uint8Array(),
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
