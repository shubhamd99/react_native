import {
  actionChannel,
  call,
  put,
  take,
  fork,
  cancelled,
  cancel,
  all,
} from 'redux-saga/effects';
import {
  eventChannel,
  END,
  EventChannel,
  MulticastChannel,
  multicastChannel,
  Channel,
} from 'redux-saga';
import {
  requestAction,
  requestProcessed,
  startCountdown,
  updateCountdown,
  stopCountdown,
  broadcastAction,
  workerAReceived,
  workerBReceived,
} from './slice';
import { Action } from '@reduxjs/toolkit';

// --- Action Channel Saga ---
// channel is used to buffer incoming messages if the Saga is busy
function* watchRequestsSaga(): Generator {
  // 1. Create a channel for request actions
  // The channel buffers incoming messages if the Saga is busy
  const requestChan: Channel<Action> = yield actionChannel(requestAction.type);
  while (true) {
    // 2. take from the channel
    yield take(requestChan);
    // 3. Process the request (simulating a delay)
    yield call(delay, 1000);
    yield put(requestProcessed());
  }
}

const delay = (ms: number) => new Promise<void>(res => setTimeout(res, ms));

// --- Event Channel Saga ---
// eventChannel is used to create a channel that can be used to communicate
// with the outside world
function countdown(secs: number): EventChannel<number> {
  // emitter is a function that can be used to send values to the channel
  return eventChannel<number>(emitter => {
    const iv = setInterval(() => {
      secs -= 1;
      if (secs > 0) {
        emitter(secs);
      } else {
        // END is a special value that is used to signal the end of the channel
        emitter(END);
      }
    }, 1000);
    // cleanup function
    return () => {
      clearInterval(iv);
    };
  });
}

function* countdownSaga(): Generator {
  let chan: EventChannel<number> | undefined;
  try {
    chan = yield call(countdown, 10);
    while (true) {
      const seconds: number = yield take(chan!);
      yield put(updateCountdown(seconds));
    }
  } finally {
    if (yield cancelled()) {
      chan?.close();
    }
    yield put(updateCountdown(0));
  }
}

function* watchCountdown(): Generator {
  while (true) {
    yield take(startCountdown.type);
    // fork is used to run the saga in a separate thread
    const task = yield fork(countdownSaga);
    yield take(stopCountdown.type);
    // cancel is used to stop the saga
    yield cancel(task);
  }
}

// --- Multicast Channel Saga ---

function* workerASaga(channel: MulticastChannel<Action>): Generator {
  while (true) {
    yield take(channel, '*');
    yield put(workerAReceived());
  }
}

function* workerBSaga(channel: MulticastChannel<Action>): Generator {
  while (true) {
    yield take(channel, '*');
    yield put(workerBReceived());
  }
}

function* watchBroadcastSaga(): Generator {
  // Create a multicast channel
  // multicastChannel is used to send the same message to multiple workers
  const channel: MulticastChannel<Action> = yield call(multicastChannel);

  // Fork workers and pass the channel
  yield fork(workerASaga, channel);
  yield fork(workerBSaga, channel);

  while (true) {
    // take broadcast action and put it to the channel
    const action: Action = yield take(broadcastAction.type);
    yield put(channel, action);
  }
}

export function* channelsSaga(): Generator {
  yield all([
    fork(watchRequestsSaga),
    fork(watchCountdown),
    fork(watchBroadcastSaga),
  ]);
}
