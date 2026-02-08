import { take, put, call, fork } from 'redux-saga/effects';
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  logout,
  logAction,
  startLogger,
  stopLogger,
  triggerClick,
  showCongratulation,
} from './slice';
import { PayloadAction, Action } from '@reduxjs/toolkit';

// Simulating API call
const authorize = (user: string, password?: string) =>
  new Promise<string>((resolve, reject) => {
    setTimeout(() => {
      if (password === 'fail') {
        reject('Invalid credentials');
      } else {
        resolve('token_123');
      }
    }, 1000);
  });

function* loginFlow() {
  while (true) {
    // 1. Wait for login request
    const { payload: user }: PayloadAction<string> = yield take(
      loginRequest.type,
    );

    // 2. Call authorize
    try {
      yield call(authorize, user);

      yield put(loginSuccess(user));

      // 3. Wait for logout
      yield take(logout.type);

      // 4. Handle logout (state update in reducer)
    } catch (error) {
      yield put(loginFailure(error as string));
    }
  }
}

// Logger Saga: Watches all actions and logs them if enabled
function* watchAndLog() {
  while (true) {
    // Wait for logger to be started
    yield take(startLogger.type);

    while (true) {
      // Take any action
      const action: Action = yield take('*');

      // Check if we should stop
      if (action.type === stopLogger.type) {
        break;
      }

      // Filter out the logAction itself to avoid infinite loop
      // Also filter out internal redux actions if desired, but user asked for "all actions"
      if (action.type !== logAction.type) {
        yield put(logAction(`Action: ${action.type}`));
      }
    }
  }
}

// Counter Saga: Watches for first 3 clicks
function* watchFirstThreeClicks() {
  for (let i = 0; i < 3; i++) {
    yield take(triggerClick.type);
  }
  yield put(showCongratulation('Congratulations! You clicked 3 times.'));
}

export function* watchFutureActionsSagas() {
  yield fork(loginFlow);
  yield fork(watchAndLog);
  yield fork(watchFirstThreeClicks);
}
