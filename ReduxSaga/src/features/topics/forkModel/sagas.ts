import { put, call, fork, spawn, takeEvery } from 'redux-saga/effects';
import { startAttachedFork, startDetachedFork, addLog } from './slice';

// Simulate a task that takes some time
const doTask = (id: number, duration: number) =>
  new Promise<string>((resolve, reject) => {
    setTimeout(() => {
      // Randomly fail to demonstrate error propagation
      if (Math.random() > 0.7) {
        reject(new Error(`Task ${id} failed`));
      } else {
        resolve(`Task ${id} finished in ${duration}ms`);
      }
    }, duration);
  });

function* childTask(id: number, duration: number) {
  yield put(addLog(`Child Task ${id} started`));
  try {
    const result: string = yield call(doTask, id, duration);
    yield put(addLog(`Child Task ${id} result: ${result}`));
  } catch (e) {
    yield put(addLog(`Child Task ${id} error: ${(e as Error).message}`));
    throw e; // Re-throw to propagate error in attached fork
  }
}

function* attachedForkSaga() {
  yield put(addLog('--- Starting Parent (Attached Fork) ---'));
  try {
    // Parent waits for attached forks to complete
    yield fork(childTask, 1, 1000);
    yield fork(childTask, 2, 1500);
    yield put(addLog('Parent finished its own body (waiting for children...)'));
  } catch (e) {
    yield put(addLog(`Parent caught error: ${(e as Error).message}`));
  } finally {
    // This finally block executes when the saga terminates (after children or on error)
    yield put(addLog('--- Parent (Attached) Terminated ---'));
  }
}

function* detachedForkSaga() {
  yield put(addLog('--- Starting Parent (Detached Fork/Spawn) ---'));
  try {
    // Parent does NOT wait for spawned tasks
    yield spawn(childTask, 3, 1000);
    yield spawn(childTask, 4, 1500);
    yield put(
      addLog('Parent finished its own body (NOT waiting for children)'),
    );
  } catch (e) {
    // Errors from spawned tasks do NOT bubble here
    yield put(addLog(`Parent caught error: ${(e as Error).message}`));
  } finally {
    yield put(addLog('--- Parent (Detached) Terminated ---'));
  }
}

export function* watchForkModelSagas() {
  yield takeEvery(startAttachedFork.type, attachedForkSaga);
  yield takeEvery(startDetachedFork.type, detachedForkSaga);
}
