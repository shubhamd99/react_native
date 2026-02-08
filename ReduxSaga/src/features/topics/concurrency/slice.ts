import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ConcurrencyState {
  logs: string[];
}

const initialState: ConcurrencyState = {
  logs: [],
};

const concurrencySlice = createSlice({
  name: 'concurrency',
  initialState,
  reducers: {
    startTakeEvery: () => {
      // We don't clear logs here to show accumulation
      // but maybe we should clear if it's a new "session" of clicks?
      // For this example, let's keep appending or allow manual clear.
    },
    startTakeLatest: () => {
      // same here
    },
    addLog: (state, action: PayloadAction<string>) => {
      state.logs.push(action.payload);
    },
    clearLogs: state => {
      state.logs = [];
    },
  },
});

export const { startTakeEvery, startTakeLatest, addLog, clearLogs } =
  concurrencySlice.actions;

export default concurrencySlice.reducer;
