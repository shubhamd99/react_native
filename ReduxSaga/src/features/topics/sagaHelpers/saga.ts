import {
  put,
  takeEvery,
  takeLatest,
  takeLeading,
  throttle,
  delay,
} from 'redux-saga/effects';
import {
  incrementEveryAsync,
  incrementLatestAsync,
  incrementLeadingAsync,
  incrementThrottledAsync,
  incrementEvery,
  incrementLatest,
  incrementLeading,
  incrementThrottled,
} from './slice';

// Worker Saga: will be fired on incrementEveryAsync actions
function* workerEvery() {
  // Delay for 1 sec to simulate async work
  yield delay(1000);
  yield put(incrementEvery());
}

// Worker Saga: will be fired on incrementLatestAsync actions
function* workerLatest() {
  // Delay for 1 sec to simulate async work
  yield delay(1000);
  yield put(incrementLatest());
}

// Worker Saga: will be fired on incrementLeadingAsync actions
function* workerLeading() {
  // Delay for 1 sec to simulate async work
  yield delay(1000);
  yield put(incrementLeading());
}

// Worker Saga: will be fired on incrementThrottledAsync actions
function* workerThrottled() {
  yield put(incrementThrottled());
}

// Watcher Saga
export function* watchSagaHelpers() {
  yield takeEvery(incrementEveryAsync.type, workerEvery);
  // takeLatest - if multiple actions are dispatched,
  // only the last one will be processed
  yield takeLatest(incrementLatestAsync.type, workerLatest);
  // takeLeading - if multiple actions are dispatched,
  // only the first one will be processed until it finishes
  yield takeLeading(incrementLeadingAsync.type, workerLeading);
  // throttle - prevents the saga from being fired more than
  // once in the specified time period (e.g., 2000ms)
  yield throttle(2000, incrementThrottledAsync.type, workerThrottled);
}
