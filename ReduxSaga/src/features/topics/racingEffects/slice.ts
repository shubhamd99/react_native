import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RacingEffectsState {
  data: string | null;
  status: 'idle' | 'fetching' | 'success' | 'failure' | 'timeout';
  syncStatus: 'stopped' | 'running';
  logs: string[];
  error: string | null;
}

const initialState: RacingEffectsState = {
  data: null,
  status: 'idle',
  syncStatus: 'stopped',
  logs: [],
  error: null,
};

const racingEffectsSlice = createSlice({
  name: 'racingEffects',
  initialState,
  reducers: {
    fetchFast: state => {
      state.status = 'fetching';
      state.error = null;
      state.data = null;
    },
    fetchSlow: state => {
      state.status = 'fetching';
      state.error = null;
      state.data = null;
    },
    fetchSuccess: (state, action: PayloadAction<string>) => {
      state.status = 'success';
      state.data = action.payload;
    },
    fetchFailure: (state, action: PayloadAction<string>) => {
      state.status = 'failure';
      state.error = action.payload;
    },
    fetchTimeout: state => {
      state.status = 'timeout';
      state.error = 'Request timed out!';
    },
    startSync: state => {
      state.syncStatus = 'running';
    },
    cancelSync: _state => {
      // Saga handles the cancellation logic
    },
    syncStatusUpdate: (state, action: PayloadAction<'stopped' | 'running'>) => {
      state.syncStatus = action.payload;
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
  fetchFast,
  fetchSlow,
  fetchSuccess,
  fetchFailure,
  fetchTimeout,
  startSync,
  cancelSync,
  syncStatusUpdate,
  addLog,
  clearLogs,
} = racingEffectsSlice.actions;

export default racingEffectsSlice.reducer;
