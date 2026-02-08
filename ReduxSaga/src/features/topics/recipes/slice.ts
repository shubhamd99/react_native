import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RecipesState {
  throttleCount: number;
  throttleExecutions: number;
  debounceText: string;
  debounceExecutions: string[];
  retryStatus: 'idle' | 'trying' | 'success' | 'failed';
  retryAttempt: number;
  logs: string[];
}

const initialState: RecipesState = {
  throttleCount: 0,
  throttleExecutions: 0,
  debounceText: '',
  debounceExecutions: [],
  retryStatus: 'idle',
  retryAttempt: 0,
  logs: [],
};

const recipesSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    // Throttle
    triggerThrottle: state => {
      state.throttleCount += 1;
    },
    throttleExecuted: state => {
      state.throttleExecutions += 1;
    },

    // Debounce
    triggerDebounce: (state, action: PayloadAction<string>) => {
      state.debounceText = action.payload;
    },
    debounceExecuted: (state, action: PayloadAction<string>) => {
      state.debounceExecutions.push(action.payload);
      if (state.debounceExecutions.length > 5) state.debounceExecutions.shift();
    },

    // Retry
    triggerRetry: state => {
      state.retryStatus = 'trying';
      state.retryAttempt = 0;
    },
    retryAttemptFailed: (state, action: PayloadAction<number>) => {
      state.retryAttempt = action.payload;
    },
    retrySuccess: state => {
      state.retryStatus = 'success';
    },
    retryFailure: state => {
      state.retryStatus = 'failed';
    },

    // Logs
    addLog: (state, action: PayloadAction<string>) => {
      state.logs.push(action.payload);
      if (state.logs.length > 20) state.logs.shift();
    },
    clearLogs: state => {
      state.logs = [];
      state.throttleCount = 0;
      state.throttleExecutions = 0;
      state.debounceText = '';
      state.debounceExecutions = [];
      state.retryStatus = 'idle';
      state.retryAttempt = 0;
    },
  },
});

export const {
  triggerThrottle,
  throttleExecuted,
  triggerDebounce,
  debounceExecuted,
  triggerRetry,
  retryAttemptFailed,
  retrySuccess,
  retryFailure,
  addLog,
  clearLogs,
} = recipesSlice.actions;

export default recipesSlice.reducer;
