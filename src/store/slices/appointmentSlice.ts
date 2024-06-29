
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Appointment {
  id: string;
  date: string;
  time: string;
  specialist: string;
  category: string;
  description: string;
}

interface AppointmentState {
  appointments: Appointment[];
}

const initialState: AppointmentState = {
  appointments: [],
};

const appointmentSlice = createSlice({
  name: 'appointments',
  initialState,
  reducers: {
    addAppointment: (state, action: PayloadAction<Appointment>) => {
      state.appointments.push(action.payload);
    },
    removeAppointment: (state, action: PayloadAction<string>) => {
      state.appointments = state.appointments.filter(app => app.id !== action.payload);
    },
  },
});

export const { addAppointment, removeAppointment } = appointmentSlice.actions;
export default appointmentSlice.reducer;
