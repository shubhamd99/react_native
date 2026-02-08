import { take, put, fork, cancel, cancelled, delay } from 'redux-saga/effects';
import {
  startDownload,
  cancelDownload,
  updateProgress,
  downloadSuccess,
  downloadAborted,
  addLog,
} from './slice';
import { Task } from 'redux-saga';

// --- Child Task: Progress Updater ---
function* progressSaga(): Generator<any, void, any> {
  try {
    let progress = 0;
    while (progress < 100) {
      yield delay(500); // Update every 500ms
      progress += 10;
      yield put(updateProgress(progress));
      yield put(addLog(`Progress: ${progress}%`));
    }
  } finally {
    if (yield cancelled()) {
      yield put(addLog('Progress Saga: Cancelled! Stopping timer.'));
    }
  }
}

// --- Parent Task: Download ---
function* downloadSaga(): Generator<any, void, any> {
  try {
    yield put(addLog('Download Saga: Starting download...'));

    // Fork the progress saga so it runs in background
    const progressTask: Task = (yield fork(progressSaga)) as Task;

    // Simulate a long download process (needs to be longer than progress loop to show completion,
    // OR the progress loop drives the completion. Let's make the progress loop the driver for simplicity,
    // but wait for it here? No, let's just simulate work here.)

    // Actually, let's coordinate.
    // We'll just wait for 5 seconds to simulate the download, while progress runs.
    yield delay(5000);

    yield put(downloadSuccess());
    yield put(addLog('Download Saga: Download complete!'));

    // Ensure progress task stops if it hasn't finished (though logic above implies they finish together)
    // If we want accurate progress sync, we'd implementation differently, but this is for cancellation demo.
    yield cancel(progressTask);
  } finally {
    if (yield cancelled()) {
      yield put(addLog('Download Saga: Cancelled!'));
      yield put(addLog('Download Saga: Cleaning up temp files...'));
      yield delay(500); // Simulate cleanup time
      yield put(addLog('Download Saga: Cleanup done.'));
      yield put(downloadAborted());
      // Note: The forked progressTask is automatically cancelled when this parent is cancelled!
    }
  }
}

// --- Watcher ---
function* watchTaskCancellationSagas(): Generator<any, void, any> {
  while (true) {
    // Wait for start
    yield take(startDownload.type);

    // Start the download task
    const task: Task = (yield fork(downloadSaga)) as Task;

    // Wait for cancel action OR task completion?
    // If we use 'take' here, we block until cancel.
    // But what if the download finishes first?

    // We need to race between "Cancel Action" and "Task Completion".
    // OR, essentially, we interact with the running task.

    // Pattern: Fork a task, then listen for cancel.

    const action: { type: string } = (yield take([
      cancelDownload.type,
      downloadSuccess.type,
      downloadAborted.type,
    ])) as { type: string };

    if (action.type === cancelDownload.type) {
      yield cancel(task); // This triggers cancellation propagation
    }

    // If downloadSuccess, the loop continues and waits for next start.
  }
}

export { watchTaskCancellationSagas };
