import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ParallelTasksState {
  status: 'idle' | 'running' | 'completed';
  executionTime: number | null;
  logs: string[];
}

const initialState: ParallelTasksState = {
  status: 'idle',
  executionTime: null,
  logs: [],
};

const parallelTasksSlice = createSlice({
  name: 'parallelTasks',
  initialState,
  reducers: {
    runSequential: state => {
      state.status = 'running';
      state.executionTime = null;
      state.logs = [];
    },
    runParallel: state => {
      state.status = 'running';
      state.executionTime = null;
      state.logs = [];
    },
    tasksSuccess: (state, action: PayloadAction<number>) => {
      state.status = 'completed';
      state.executionTime = action.payload;
    },
    addLog: (state, action: PayloadAction<string>) => {
      state.logs.push(action.payload);
    },
    clearLogs: state => {
      state.logs = [];
      state.status = 'idle';
      state.executionTime = null;
    },
  },
});

export const { runSequential, runParallel, tasksSuccess, addLog, clearLogs } =
  parallelTasksSlice.actions;

export default parallelTasksSlice.reducer;
