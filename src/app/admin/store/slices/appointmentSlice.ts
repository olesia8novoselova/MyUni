
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Appointment {
  id: string,
  appointment_date: string ;
  start_time: string;
  appointmentType:string;
  end_time: string;
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
    setAppointments: (state, action: PayloadAction<Appointment[]>) => {
      state.appointments = action.payload;
    },
    removeAppointment: (state, action: PayloadAction<string>) => {
      state.appointments = state.appointments.filter(app => app.id !== action.payload);
    },
  },
});

export const { addAppointment, removeAppointment,setAppointments } = appointmentSlice.actions;
export default appointmentSlice.reducer;
