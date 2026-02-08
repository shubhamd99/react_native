import { call, put, takeEvery, all } from 'redux-saga/effects';
import { startSequential, startParallel, startComplex, addLog } from './slice';

// Simulate an async task
const step = (id: number, duration: number) =>
  new Promise<string>(resolve => {
    setTimeout(
      () => resolve(`Step ${id} completed in ${duration}ms`),
      duration,
    );
  });

function* runStep(id: number, duration: number): Generator<any, string, any> {
  yield put(addLog(`Starting step ${id}...`));
  const result = (yield call(step, id, duration)) as string;
  yield put(addLog(result));
  return result;
}

// Sequential Composition using yield* or simple yield
function* sequentialSaga(): Generator<any, void, any> {
  yield put(addLog('--- Starting Sequential Saga ---'));
  const start = Date.now();

  // yield* is used to delegate to another generator, but here we just call helper generator
  yield* runStep(1, 1000);
  yield* runStep(2, 500);
  yield* runStep(3, 1000);

  const duration = Date.now() - start;
  yield put(addLog(`--- Sequential Saga Finished in ${duration}ms ---`));
}

// Parallel Composition using yield all
function* parallelSaga(): Generator<any, void, any> {
  yield put(addLog('--- Starting Parallel Saga ---'));
  const start = Date.now();

  // Tasks start at the same time
  yield all([
    call(runStep, 1, 1000),
    call(runStep, 2, 500),
    call(runStep, 3, 1000),
  ]);

  const duration = Date.now() - start;
  yield put(addLog(`--- Parallel Saga Finished in ${duration}ms ---`));
}

// Complex Composition
function* complexSaga(): Generator<any, void, any> {
  yield put(addLog('--- Starting Complex Saga ---'));
  const start = Date.now();

  // Run step 1 first
  yield call(runStep, 1, 500);

  // Then run step 2 and 3 in parallel
  yield put(addLog('Starting parallel steps 2 and 3...'));
  yield all([call(runStep, 2, 1000), call(runStep, 3, 800)]);

  const duration = Date.now() - start;
  yield put(addLog(`--- Complex Saga Finished in ${duration}ms ---`));
}

export function* watchComposingSagas() {
  yield takeEvery(startSequential.type, sequentialSaga);
  yield takeEvery(startParallel.type, parallelSaga);
  yield takeEvery(startComplex.type, complexSaga);
}
