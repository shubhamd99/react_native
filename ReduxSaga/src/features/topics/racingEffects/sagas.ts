import { take, call, put, race, delay, fork } from 'redux-saga/effects';
import {
  fetchFast,
  fetchSlow,
  fetchSuccess,
  fetchFailure,
  fetchTimeout,
  startSync,
  cancelSync,
  syncStatusUpdate,
  addLog,
} from './slice';

// Simulate API calls
const fetchApi = (delayMs: number) =>
  new Promise<string>(resolve => {
    setTimeout(() => {
      resolve('Fetched Data!');
    }, delayMs);
  });

function* fetchWithTimeoutSaga(action: {
  type: string;
}): Generator<any, void, any> {
  const isSlow = action.type === fetchSlow.type;
  const delayTime = isSlow ? 2000 : 500; // Slow takes 2s, Fast takes 0.5s
  const timeout = 1000; // Timeout is 1s logic from docs: yield race({ posts: call(fetchApi, '/posts'), timeout: delay(1000) })

  try {
    yield put(
      addLog(
        `Race: Starting fetch (Expected duration: ${delayTime}ms, Timeout: ${timeout}ms)`,
      ),
    );

    const { response } = (yield race({
      response: call(fetchApi, delayTime),
      timeoutOccurred: delay(timeout),
    })) as { response?: string; timeoutOccurred?: boolean };

    if (response) {
      yield put(fetchSuccess(response));
      yield put(addLog('Race: Fetch won!'));
    } else {
      yield put(fetchTimeout());
      yield put(addLog('Race: Timeout won! Fetch cancelled automatically.'));
    }
  } catch (error) {
    yield put(fetchFailure((error as Error).message));
  }
}

// Background Task Loop
function* backgroundTask(): Generator<any, void, any> {
  try {
    while (true) {
      yield put(addLog('Background Task: Syncing...'));
      yield delay(1000); // Simulate work
    }
  } finally {
    yield put(addLog('Background Task: Cancelled/Stopped'));
  }
}

function* watchBackgroundTask(): Generator<any, void, any> {
  while (true) {
    yield take(startSync.type);
    yield put(syncStatusUpdate('running'));
    yield put(addLog('Race: Starting background task race...'));

    // Race between the task and the cancel action
    // Docs: yield race({ task: call(backgroundTask), cancel: take('CANCEL_TASK') })

    yield race({
      task: call(backgroundTask),
      cancel: take(cancelSync.type),
    });

    yield put(syncStatusUpdate('stopped'));
    yield put(addLog('Race: Race finished. Background task stopped.'));
  }
}

function* watchFetchRequestsRobust(): Generator<any, void, any> {
  // We can't easily listen to two actions with different payloads in one simple 'takeEvery'
  // unless we use a pattern matcher.
  // Let's just create a loop that waits for either.

  while (true) {
    const action = (yield take([fetchFast.type, fetchSlow.type])) as {
      type: string;
    };
    yield call(fetchWithTimeoutSaga, action);
  }
}

export function* watchRacingEffectsSagas() {
  yield fork(watchFetchRequestsRobust);
  yield fork(watchBackgroundTask);
}
