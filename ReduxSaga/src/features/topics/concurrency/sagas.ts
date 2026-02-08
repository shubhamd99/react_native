import {
  takeEvery,
  takeLatest,
  put,
  call,
  cancelled,
  all,
  fork,
} from 'redux-saga/effects';
import { startTakeEvery, startTakeLatest, addLog } from './slice';

// Simulate a task that takes some time
const doTask = (id: number, duration: number) =>
  new Promise<string>(resolve => {
    setTimeout(() => resolve(`Task ${id} finished in ${duration}ms`), duration);
  });

function* runTask(actionStr: string): Generator<any, void, any> {
  const id = Math.floor(Math.random() * 1000);
  yield put(addLog(`Starting ${actionStr} task ${id}...`));
  try {
    // delay to simulate work
    const result = (yield call(doTask, id, 1000)) as string;
    yield put(addLog(`${actionStr} ${result}`));
  } catch {
    if (yield cancelled()) {
      yield put(addLog(`${actionStr} task ${id} cancelled`));
    }
  }
}

function* watchTakeEverySaga() {
  // takeEvery - run all sagas
  yield takeEvery(startTakeEvery.type, function* () {
    yield call(runTask, 'takeEvery');
  });
}

function* watchTakeLatestSaga() {
  // takeLatest - run only the latest saga
  yield takeLatest(startTakeLatest.type, function* () {
    yield call(runTask, 'takeLatest');
  });
}

export function* watchConcurrencySagas() {
  // all - run all sagas in parallel
  yield all([fork(watchTakeEverySaga), fork(watchTakeLatestSaga)]);
}
