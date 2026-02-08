import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RootSagaPatternsState {
  taskAStatus: 'stopped' | 'running' | 'crashed';
  taskBStatus: 'stopped' | 'running' | 'crashed';
  activeDemo: 'none' | 'fragile' | 'resilient';
  logs: string[];
}

const initialState: RootSagaPatternsState = {
  taskAStatus: 'stopped',
  taskBStatus: 'stopped',
  activeDemo: 'none',
  logs: [],
};

const rootSagaPatternsSlice = createSlice({
  name: 'rootSagaPatterns',
  initialState,
  reducers: {
    startDemo: (state, action: PayloadAction<'fragile' | 'resilient'>) => {
      state.activeDemo = action.payload;
      state.logs = [];
      state.taskAStatus = 'stopped'; // Sagas will update this to running
      state.taskBStatus = 'stopped';
    },
    stopDemo: state => {
      state.activeDemo = 'none';
      state.taskAStatus = 'stopped';
      state.taskBStatus = 'stopped';
    },
    updateTaskStatus: (
      state,
      action: PayloadAction<{
        task: 'A' | 'B';
        status: 'stopped' | 'running' | 'crashed';
      }>,
    ) => {
      if (action.payload.task === 'A') {
        state.taskAStatus = action.payload.status;
      } else {
        state.taskBStatus = action.payload.status;
      }
    },
    crashTask: (_state, _action: PayloadAction<'A' | 'B'>) => {
      // Handled by saga
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
  startDemo,
  stopDemo,
  updateTaskStatus,
  crashTask,
  addLog,
  clearLogs,
} = rootSagaPatternsSlice.actions;

export default rootSagaPatternsSlice.reducer;
