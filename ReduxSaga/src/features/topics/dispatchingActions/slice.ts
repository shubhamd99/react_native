import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DispatchingActionsState {
  isAuthenticated: boolean;
  username: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: DispatchingActionsState = {
  isAuthenticated: false,
  username: null,
  loading: false,
  error: null,
};

const dispatchingActionsSlice = createSlice({
  name: 'dispatchingActions',
  initialState,
  reducers: {
    loginRequest: (state, _action: PayloadAction<string>) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.username = action.payload;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
    },
    logout: state => {
      state.isAuthenticated = false;
      state.username = null;
      state.error = null;
    },
  },
});

export const { loginRequest, loginSuccess, loginFailure, logout } =
  dispatchingActionsSlice.actions;
export default dispatchingActionsSlice.reducer;
