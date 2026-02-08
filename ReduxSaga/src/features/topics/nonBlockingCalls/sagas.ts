import {
  take,
  call,
  put,
  fork,
  cancel,
  cancelled,
  delay,
} from 'redux-saga/effects';
import { Task } from 'redux-saga';
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  loginCancelled,
  logout,
  addLog,
} from './slice';
import { PayloadAction, Action } from '@reduxjs/toolkit';

// Simulate a long-running API call
function* authorize(
  user: string,
  _password?: string,
): Generator<any, string, any> {
  // Changed password to _password
  try {
    yield put(addLog(`Authorize: Starting API call for ${user}...`));
    // Simulate 3 seconds delay
    yield delay(3000);

    // Simulate randomness failure
    if (Math.random() > 0.8) {
      throw new Error('Random API Failure');
    }

    yield put(addLog('Authorize: API call finished successfully'));
    return 'token_123';
  } catch (error) {
    yield put(addLog(`Authorize: Error - ${error}`));
    throw error;
  } finally {
    if (yield cancelled()) {
      yield put(addLog('Authorize: Task was CANCELLED directly!'));
    }
  }
}

function* authorizeWithDispatch(user: string): Generator<any, void, any> {
  try {
    yield call(authorize, user);
    yield put(loginSuccess(user));
  } catch (error) {
    yield put(loginFailure((error as Error).message));
  } finally {
    if (yield cancelled()) {
      // Cleanup if needed
    }
  }
}

function* loginFlow(): Generator<any, void, any> {
  // Renamed from loginFlowCorrect to loginFlow
  while (true) {
    const { payload: user } = (yield take(
      loginRequest.type,
    )) as PayloadAction<string>;

    yield put(addLog('Main: Forking authorize task...'));
    const task = (yield fork(authorizeWithDispatch, user)) as Task;

    const action = (yield take([logout.type, loginFailure.type])) as Action;

    if (action.type === logout.type) {
      // If we get a logout action, we cancel the task
      yield cancel(task);
      yield put(addLog('Main: Cancelled task due to Logout'));
      yield put(loginCancelled());
    } else {
      // If we get loginFailure, the task is already done/failed.
      yield put(addLog('Main: Login failed.'));
    }
  }
}

export function* watchNonBlockingCallsSagas() {
  yield fork(loginFlow); // Updated to call the renamed loginFlow
}
