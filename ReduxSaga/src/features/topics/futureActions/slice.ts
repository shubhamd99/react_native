import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FutureActionsState {
  user: string | null;
  status: 'logged_out' | 'loading' | 'logged_in';
  error: string | null;
  logs: string[];
  congratulationMessage: string | null;
  isLoggerRunning: boolean;
}

const initialState: FutureActionsState = {
  user: null,
  status: 'logged_out',
  error: null,
  logs: [],
  congratulationMessage: null,
  isLoggerRunning: false,
};

const futureActionsSlice = createSlice({
  name: 'futureActions',
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
    logout: state => {
      // Logic handled in saga mostly, but we can set loading/reset here if needed
      // But typically logout is synchronous or valid immediately in UI
      state.status = 'logged_out';
      state.user = null;
      state.error = null;
    },
    // Logger and Counter Actions
    startLogger: state => {
      state.isLoggerRunning = true;
    },
    stopLogger: state => {
      state.isLoggerRunning = false;
    },
    logAction: (state, action: PayloadAction<string>) => {
      state.logs.push(action.payload);
      // Keep only last 20 logs to avoid performance issues
      if (state.logs.length > 20) {
        state.logs.shift();
      }
    },
    triggerClick: () => {
      // Saga handles this
    },
    showCongratulation: (state, action: PayloadAction<string>) => {
      state.congratulationMessage = action.payload;
    },
    clearLogs: state => {
      state.logs = [];
      state.congratulationMessage = null;
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  logout,
  startLogger,
  stopLogger,
  logAction,
  triggerClick,
  showCongratulation,
  clearLogs,
} = futureActionsSlice.actions;

export default futureActionsSlice.reducer;
