
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Registration {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

interface RegistrationState {
  registrations: Registration[];
}

const initialState: RegistrationState = {
  registrations: [],
};

const registerSlice = createSlice({
  name: 'registrations',
  initialState,
  reducers: {
    addRegistration: (state, action: PayloadAction<Registration>) => {
      state.registrations.push(action.payload);
    },
  },
});

export const { addRegistration } = registerSlice.actions;
export default registerSlice.reducer;
