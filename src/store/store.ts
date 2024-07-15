// store.ts
import { configureStore } from '@reduxjs/toolkit';
import appointmentReducer from './slices/appointmentSlice';
import loginReducer from './slices/loginSlice';

export const store = configureStore({
  reducer: {
    appointments: appointmentReducer,
    login: loginReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
