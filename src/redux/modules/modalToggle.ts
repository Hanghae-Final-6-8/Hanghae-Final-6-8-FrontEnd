import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

export interface modalToggleState {
  modalToggle: boolean;
}

const initialState: modalToggleState = {
  modalToggle: false,
};

export const modalToggleSlice = createSlice({
  // 액션명
  name: 'modalToggleReducer',
  initialState,
  reducers: {
    setModalToggle: (state, action: PayloadAction<boolean>) => {
      return { modalToggle: action.payload };
    },
  },
});

export default modalToggleSlice;

export const { setModalToggle } = modalToggleSlice.actions;

const modalToggleSliceActionCreators = {
  setModalToggle,
};

export { modalToggleSliceActionCreators };
