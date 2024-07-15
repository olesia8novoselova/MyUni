import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LoginState {
  isLoggedIn: boolean;
  email: string;
}

const initialState: LoginState = {
  isLoggedIn: false,
  email: '',
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.isLoggedIn = true;
      state.email = action.payload;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.email = '';
    },
  },
});

export const { login, logout } = loginSlice.actions;

export default loginSlice.reducer;
