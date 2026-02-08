import {
  take,
  call,
  put,
  all,
  spawn,
  fork,
  cancel,
  delay,
  cancelled,
} from 'redux-saga/effects';
import {
  startDemo,
  stopDemo,
  updateTaskStatus,
  crashTask,
  addLog,
} from './slice';
import { Task } from 'redux-saga';
import { PayloadAction } from '@reduxjs/toolkit';

// --- Generic Task Generator ---
function* runTask(taskName: 'A' | 'B'): Generator<any, void, any> {
  try {
    yield put(addLog(`[${taskName}] Starting...`));
    yield put(updateTaskStatus({ task: taskName, status: 'running' }));

    while (true) {
      // Check for crash signal
      const { crash } = (yield all({
        work: delay(1000), // Simulate work
        crash: take(
          (action: any) =>
            action.type === crashTask.type && action.payload === taskName,
        ),
      })) as { work?: any; crash?: any };

      if (crash) {
        throw new Error(`[${taskName}] CRASHED MANUALLY!`);
      }

      yield put(addLog(`[${taskName}] Working...`));
    }
  } catch (e) {
    yield put(addLog(`[${taskName}] Error: ${(e as Error).message}`));
    yield put(updateTaskStatus({ task: taskName, status: 'crashed' }));
    throw e; // Bubble up error
  } finally {
    if (yield cancelled()) {
      yield put(addLog(`[${taskName}] Cancelled.`));
      yield put(updateTaskStatus({ task: taskName, status: 'stopped' }));
    }
  }
}

// --- Fragile Root (using ALL) ---
// If one fails, ALL fail.
function* fragileRootSaga(): Generator<any, void, any> {
  yield put(addLog('Fragile Root: Starting Task A and B with all([...])'));
  try {
    yield all([call(runTask, 'A'), call(runTask, 'B')]);
  } catch {
    yield put(
      addLog(`Fragile Root: Caught error from child. Root terminating.`),
    );
  }
}

// --- Resilient Root (using SPAWN) ---
// If one fails, it restarts. Others are unaffected.
function* resilientRootSaga(): Generator<any, void, any> {
  yield put(addLog('Resilient Root: Spawning Task A and B independently...'));

  // Spawn Task A with restart logic
  yield spawn(function* () {
    while (true) {
      try {
        yield call(runTask, 'A');
      } catch {
        yield put(
          addLog(`Resilient Root: Task A crashed. Restarting in 1s...`),
        );
        yield delay(1000);
      }
    }
  });

  // Spawn Task B with restart logic
  yield spawn(function* () {
    while (true) {
      try {
        yield call(runTask, 'B');
      } catch {
        yield put(
          addLog(`Resilient Root: Task B crashed. Restarting in 1s...`),
        );
        yield delay(1000);
      }
    }
  });
}

// --- Demo Orchestrator ---
function* watchRootSagaPatternsSagas(): Generator<any, void, any> {
  let currentTask: Task | null = null;

  while (true) {
    const action = (yield take([
      startDemo.type,
      stopDemo.type,
    ])) as PayloadAction<'fragile' | 'resilient'>;

    if (currentTask) {
      yield cancel(currentTask);
      currentTask = null;
      yield put(addLog('Demo: Previous demo stopped/cancelled.'));
      yield delay(100); // Give time for cleanup
    }

    if (action.type === startDemo.type) {
      if (action.payload === 'fragile') {
        currentTask = (yield fork(fragileRootSaga)) as Task;
      } else if (action.payload === 'resilient') {
        currentTask = (yield fork(resilientRootSaga)) as Task;
      }
    }
  }
}

export { watchRootSagaPatternsSagas };
