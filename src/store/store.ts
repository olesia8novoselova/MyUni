// store.ts
import { configureStore } from '@reduxjs/toolkit';
import appointmentReducer from './slices/appointmentSlice';

export const store = configureStore({
  reducer: {
    appointments: appointmentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
