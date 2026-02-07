import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ErrorHandlingState {
  data: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: ErrorHandlingState = {
  data: null,
  loading: false,
  error: null,
};

const errorHandlingSlice = createSlice({
  name: 'errorHandling',
  initialState,
  reducers: {
    fetchDataRequest: state => {
      state.loading = true;
      state.error = null;
      state.data = null; // Clear previous data
    },
    fetchDataSuccess: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.data = action.payload;
    },
    fetchDataFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    triggerUnhandledError: () => {},
  },
});

export const {
  fetchDataRequest,
  fetchDataSuccess,
  fetchDataFailure,
  triggerUnhandledError,
} = errorHandlingSlice.actions;
export default errorHandlingSlice.reducer;
