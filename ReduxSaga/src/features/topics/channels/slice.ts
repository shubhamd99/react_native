import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ChannelsState {
  processedRequests: number;
  countdown: number;
  isCountdownRunning: boolean;
  workerACount: number;
  workerBCount: number;
}

const initialState: ChannelsState = {
  processedRequests: 0,
  countdown: 0,
  isCountdownRunning: false,
  workerACount: 0,
  workerBCount: 0,
};

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    requestAction: () => {},
    requestProcessed: state => {
      state.processedRequests += 1;
    },
    startCountdown: state => {
      state.isCountdownRunning = true;
    },
    updateCountdown: (state, action: PayloadAction<number>) => {
      state.countdown = action.payload;
    },
    stopCountdown: state => {
      state.isCountdownRunning = false;
    },
    broadcastAction: () => {},
    workerAReceived: state => {
      state.workerACount += 1;
    },
    workerBReceived: state => {
      state.workerBCount += 1;
    },
  },
});

export const {
  requestAction,
  requestProcessed,
  startCountdown,
  updateCountdown,
  stopCountdown,
  broadcastAction,
  workerAReceived,
  workerBReceived,
} = channelsSlice.actions;

export default channelsSlice.reducer;
