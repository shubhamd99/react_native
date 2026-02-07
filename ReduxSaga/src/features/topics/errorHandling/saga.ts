import { call, put, takeEvery } from 'redux-saga/effects';
import {
  fetchDataRequest,
  fetchDataSuccess,
  fetchDataFailure,
  triggerUnhandledError,
} from './slice';
import { fetchDataApi } from './api';

function* fetchDataSaga() {
  try {
    const data: string = yield call(fetchDataApi);
    yield put(fetchDataSuccess(data));
  } catch (error) {
    if (error instanceof Error) {
      yield put(fetchDataFailure(error.message));
    } else {
      yield put(fetchDataFailure('An unknown error occurred'));
    }
  }
}

export function* watchFetchData() {
  yield takeEvery(fetchDataRequest.type, fetchDataSaga);
  yield takeEvery(triggerUnhandledError.type, function* () {
    // This error will bubble up because it's not caught here
    throw new Error('This is an unhandled error from a saga!');
  });
}
