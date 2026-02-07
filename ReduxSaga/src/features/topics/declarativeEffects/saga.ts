import { call, put, takeEvery } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { fetchUserRequest, fetchUserSuccess, fetchUserFailure } from './slice';
import { fetchUserApi } from './api';

function* fetchUserSaga(action: PayloadAction<string>) {
  try {
    // call() is an effect used to invoke a function
    // (including asynchronous ones like API calls that return Promises) and
    // pause the execution of the saga until that function returns a value
    // or throws an error

    // Declarative Effect: yield call(fn, ...args)
    // Instead of executing the promise directly (const user = yield fetchUserApi(action.payload)),
    // we yield a plain object describing the function call.
    // This makes testing easier as we can test the yielded object without mocking the API.
    const user: { id: string; name: string } = yield call(
      fetchUserApi,
      action.payload,
    );
    // put() is an effect used to dispatch an action to the store
    yield put(fetchUserSuccess(user));
  } catch (error) {
    if (error instanceof Error) {
      yield put(fetchUserFailure(error.message));
    } else {
      yield put(fetchUserFailure('An unknown error occurred'));
    }
  }
}

// watcher saga
export function* watchFetchUser() {
  // takeEvery: it will listen for the fetchUserRequest action and
  // call the fetchUserSaga function it will not block the main thread
  yield takeEvery(fetchUserRequest.type, fetchUserSaga);
}
