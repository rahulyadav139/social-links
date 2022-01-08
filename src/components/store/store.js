import { configureStore } from '@reduxjs/toolkit';
import AuthSlice from './authSlice';
import ModalSlice from './modalSlice';

const store = configureStore({
  reducer: {
    auth: AuthSlice.reducer,
    modal: ModalSlice.reducer,
  },
});

export default store;
