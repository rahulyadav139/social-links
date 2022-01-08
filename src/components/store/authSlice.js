import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  token: '',
  uid: '',
  userProfile: '',
  transfer: 'false',
};

const AuthSlice = createSlice({
  initialState,
  name: 'auth',
  reducers: {
    signInHandler(state, action) {
      state.token = action.payload.token;
      state.uid = action.payload.uid;
      state.isLoggedIn = true;
    },
    signOutHandler(state) {
      state.token = '';
      state.uid = '';
      state.isLoggedIn = false;
    },
    updateUserProfile(state, action) {
      state.userProfile = action.payload;
    },
    transferToggle(state) {
      state.transfer = !state.transfer;
    },
    updateQuickLinks(state, action) {
      const { title, username } = action.payload;
      state.userProfile.quickLinks[title] = username;
    },
  },
});

export const AuthActions = AuthSlice.actions;

export default AuthSlice;
