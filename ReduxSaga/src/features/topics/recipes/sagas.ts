import {
  takeLatest,
  throttle,
  debounce,
  call,
  put,
  delay,
} from 'redux-saga/effects';
import {
  triggerThrottle,
  throttleExecuted,
  triggerDebounce,
  debounceExecuted,
  triggerRetry,
  retryAttemptFailed,
  retrySuccess,
  retryFailure,
  addLog,
} from './slice';

// --- Throttle Saga ---
function* handleThrottle(): Generator<any, void, any> {
  yield put(addLog('Throttle: Executing saga...'));
  yield put(throttleExecuted());
}

// --- Debounce Saga ---
function* handleDebounce(action: {
  payload: string;
}): Generator<any, void, any> {
  yield put(addLog(`Debounce: Executing search for "${action.payload}"...`));
  yield put(debounceExecuted(action.payload));
}

// --- Retry Saga ---
// Simulates an API call that fails 3 times then succeeds (or just fails to show max retries)
// Let's make it fail always to demonstrate the retry limit, or succeed on 3rd try.
const fakeApiCall = (attempt: number) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (attempt < 3) {
        reject(new Error(`Failure on attempt ${attempt}`));
      } else {
        resolve('Success!');
      }
    }, 500);
  });
};

function* handleRetry(): Generator<any, void, any> {
  const maxRetries = 3;
  for (let i = 1; i <= maxRetries; i++) {
    try {
      yield put(addLog(`Retry: Attempt ${i} starting...`));
      yield call(fakeApiCall, i);
      yield put(addLog('Retry: Success!'));
      yield put(retrySuccess());
      return;
    } catch (err) {
      console.log(err);
      yield put(addLog(`Retry: Attempt ${i} failed.`));
      yield put(retryAttemptFailed(i));
      if (i < maxRetries) {
        yield delay(1000); // Wait before next retry
      }
    }
  }
  yield put(addLog('Retry: Max retries reached. Giving up.'));
  yield put(retryFailure());
}

// --- Watcher ---
function* watchRecipesSagas(): Generator<any, void, any> {
  // Throttle: Allow only one execution every 1000ms
  yield throttle(1000, triggerThrottle.type, handleThrottle);

  // Debounce: Wait for 500ms of silence before executing
  yield debounce(500, triggerDebounce.type, handleDebounce as any);

  // Retry: Normal takeLatest, but the handler implements the retry logic
  yield takeLatest(triggerRetry.type, handleRetry);
}

export { watchRecipesSagas };
