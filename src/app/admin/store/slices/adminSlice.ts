
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AdminState {
  adminId: string | null;
}

const initialState: AdminState = {
  adminId: null,
};

const AdminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setAdminId: (state, action: PayloadAction<string>) => {
      state.adminId = action.payload;
    },
  },
});

export const { setAdminId } = AdminSlice.actions;
export default AdminSlice.reducer;
