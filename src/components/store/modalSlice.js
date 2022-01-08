import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isModal: false,
  message: '',
  isRedirect: false,
};

const ModalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    modalHandler(state, action) {
      state.isModal = action.payload.isModal;
      state.message = action.payload.message;
    },
  },
});

export const ModalActions = ModalSlice.actions;

export default ModalSlice;
