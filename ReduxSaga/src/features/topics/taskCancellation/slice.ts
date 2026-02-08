import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TaskCancellationState {
  status: 'idle' | 'downloading' | 'cancelled' | 'completed';
  progress: number;
  logs: string[];
}

const initialState: TaskCancellationState = {
  status: 'idle',
  progress: 0,
  logs: [],
};

const taskCancellationSlice = createSlice({
  name: 'taskCancellation',
  initialState,
  reducers: {
    startDownload: state => {
      state.status = 'downloading';
      state.progress = 0;
      state.logs = [];
    },
    cancelDownload: _state => {
      // Status update handled by saga or immediate?
      // Let's let the saga handle the logic, but we can update status here if needed.
      // Usually, the dispatched action triggers cancellation in saga.
    },
    updateProgress: (state, action: PayloadAction<number>) => {
      state.progress = action.payload;
    },
    downloadSuccess: state => {
      state.status = 'completed';
      state.progress = 100;
    },
    downloadAborted: state => {
      state.status = 'cancelled';
    },
    addLog: (state, action: PayloadAction<string>) => {
      state.logs.push(action.payload);
      if (state.logs.length > 20) state.logs.shift();
    },
    clearLogs: state => {
      state.logs = [];
      state.status = 'idle';
      state.progress = 0;
    },
  },
});

export const {
  startDownload,
  cancelDownload,
  updateProgress,
  downloadSuccess,
  downloadAborted,
  addLog,
  clearLogs,
} = taskCancellationSlice.actions;

export default taskCancellationSlice.reducer;
