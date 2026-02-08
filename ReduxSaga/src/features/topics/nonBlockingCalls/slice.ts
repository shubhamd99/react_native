import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NonBlockingCallsState {
  user: string | null;
  status: 'logged_out' | 'loading' | 'logged_in' | 'cancelled';
  logs: string[];
  error: string | null;
}

const initialState: NonBlockingCallsState = {
  user: null,
  status: 'logged_out',
  logs: [],
  error: null,
};

const nonBlockingCallsSlice = createSlice({
  name: 'nonBlockingCalls',
  initialState,
  reducers: {
    loginRequest: (state, _action: PayloadAction<string>) => {
      state.status = 'loading';
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<string>) => {
      state.status = 'logged_in';
      state.user = action.payload;
      state.error = null;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.status = 'logged_out';
      state.error = action.payload;
      state.user = null;
    },
    loginCancelled: state => {
      state.status = 'cancelled';
      state.user = null;
      state.error = null;
    },
    logout: state => {
      state.status = 'logged_out';
      state.user = null;
      state.error = null;
    },
    addLog: (state, action: PayloadAction<string>) => {
      state.logs.push(action.payload);
      if (state.logs.length > 20) {
        state.logs.shift();
      }
    },
    clearLogs: state => {
      state.logs = [];
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  loginCancelled,
  logout,
  addLog,
  clearLogs,
} = nonBlockingCallsSlice.actions;

export default nonBlockingCallsSlice.reducer;
