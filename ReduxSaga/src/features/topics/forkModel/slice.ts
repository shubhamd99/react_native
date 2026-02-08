import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ForkModelState {
  logs: string[];
}

const initialState: ForkModelState = {
  logs: [],
};

const forkModelSlice = createSlice({
  name: 'forkModel',
  initialState,
  reducers: {
    startAttachedFork: state => {
      state.logs = [];
    },
    startDetachedFork: state => {
      state.logs = [];
    },
    addLog: (state, action: PayloadAction<string>) => {
      state.logs.push(action.payload);
    },
    clearLogs: state => {
      state.logs = [];
    },
  },
});

export const { startAttachedFork, startDetachedFork, addLog, clearLogs } =
  forkModelSlice.actions;

export default forkModelSlice.reducer;
