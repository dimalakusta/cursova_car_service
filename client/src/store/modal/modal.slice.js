import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  modalConfig: {
    variant: null,
    state: null
  }
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    closeModal: state => {
      state.modalConfig.variant = null;
    },
    openModal: (state, action) => {
      state.modalConfig = action.payload;
    }
  }
});

export const modalActionCreator = modalSlice.actions;
export default modalSlice.reducer;
