import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ComposingSagasState {
  logs: string[];
}

const initialState: ComposingSagasState = {
  logs: [],
};

const composingSagasSlice = createSlice({
  name: 'composingSagas',
  initialState,
  reducers: {
    startSequential: state => {
      state.logs = [];
    },
    startParallel: state => {
      state.logs = [];
    },
    startComplex: state => {
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

export const {
  startSequential,
  startParallel,
  startComplex,
  addLog,
  clearLogs,
} = composingSagasSlice.actions;

export default composingSagasSlice.reducer;
