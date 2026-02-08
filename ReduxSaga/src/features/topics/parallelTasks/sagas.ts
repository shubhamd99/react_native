import { take, call, put, all } from 'redux-saga/effects';
import { runSequential, runParallel, tasksSuccess, addLog } from './slice';

// Simulate a task that takes 2 seconds
const runTask = (name: string, delayMs: number) =>
  new Promise<string>(resolve => {
    setTimeout(() => {
      resolve(`${name} completed`);
    }, delayMs);
  });

function* taskSaga(name: string, delayMs: number): Generator<any, void, any> {
  yield put(addLog(`[${name}] Starting (${delayMs}ms)...`));
  yield call(runTask, name, delayMs);
  yield put(addLog(`[${name}] Finished!`));
}

function* runSequentialSaga(): Generator<any, void, any> {
  const start = Date.now();
  yield put(addLog('Starting Sequential Execution...'));

  // Execute one by one
  yield call(taskSaga, 'Task 1', 2000);
  yield call(taskSaga, 'Task 2', 2000);

  const end = Date.now();
  const duration = end - start;
  yield put(addLog(`Sequential Finished in ${duration}ms`));
  yield put(tasksSuccess(duration));
}

function* runParallelSaga(): Generator<any, void, any> {
  const start = Date.now();
  yield put(addLog('Starting Parallel Execution (yield all)...'));

  // Execute in parallel using all
  yield all([call(taskSaga, 'Task 1', 2000), call(taskSaga, 'Task 2', 2000)]);

  const end = Date.now();
  const duration = end - start;
  yield put(addLog(`Parallel Finished in ${duration}ms`));
  yield put(tasksSuccess(duration));
}

function* watchParallelTasksSagas(): Generator<any, void, any> {
  while (true) {
    const action = (yield take([runSequential.type, runParallel.type])) as {
      type: string;
    };

    if (action.type === runSequential.type) {
      yield call(runSequentialSaga);
    } else {
      yield call(runParallelSaga);
    }
  }
}

export { watchParallelTasksSagas };
