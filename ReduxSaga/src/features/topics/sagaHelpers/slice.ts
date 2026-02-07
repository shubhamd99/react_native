import { createSlice } from '@reduxjs/toolkit';

interface SagaHelpersState {
  everyCount: number;
  latestCount: number;
  leadingCount: number;
  throttledCount: number;
}

const initialState: SagaHelpersState = {
  everyCount: 0,
  latestCount: 0,
  leadingCount: 0,
  throttledCount: 0,
};

const sagaHelpersSlice = createSlice({
  name: 'sagaHelpers',
  initialState,
  reducers: {
    // Actions to trigger sagas
    incrementEveryAsync: () => {},
    incrementLatestAsync: () => {},
    incrementLeadingAsync: () => {},
    incrementThrottledAsync: () => {},

    // Actions to update state
    incrementEvery: state => {
      state.everyCount += 1;
    },
    incrementLatest: state => {
      state.latestCount += 1;
    },
    incrementLeading: state => {
      state.leadingCount += 1;
    },
    incrementThrottled: state => {
      state.throttledCount += 1;
    },
  },
});

export const {
  incrementEveryAsync,
  incrementLatestAsync,
  incrementLeadingAsync,
  incrementThrottledAsync,
  incrementEvery,
  incrementLatest,
  incrementLeading,
  incrementThrottled,
} = sagaHelpersSlice.actions;

export default sagaHelpersSlice.reducer;
