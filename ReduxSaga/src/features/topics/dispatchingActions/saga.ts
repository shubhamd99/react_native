import { call, put, takeEvery } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { loginRequest, loginSuccess, loginFailure } from './slice';
import { loginApi } from './api';

function* loginSaga(action: PayloadAction<string>) {
  try {
    // Declarative Effect: call(fn, ...args)
    // We call the API function.
    const response: { success: boolean; username: string } = yield call(
      loginApi,
      action.payload,
    );

    // Dispatching Action: put(action)
    // After receiving the response, we instruct the middleware to dispatch an action to the Store.
    // This updates the Redux state.
    yield put(loginSuccess(response.username));
  } catch (error) {
    if (error instanceof Error) {
      // Dispatching Action: put(action) on error
      // put() is an effect used to dispatch an action to the store
      yield put(loginFailure(error.message));
    } else {
      yield put(loginFailure('An unknown error occurred'));
    }
  }
}

export function* watchLogin() {
  yield takeEvery(loginRequest.type, loginSaga);
}
