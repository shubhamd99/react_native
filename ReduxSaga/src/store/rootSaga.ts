import { all } from 'redux-saga/effects';
import { watchFetchUser } from '../features/topics/declarativeEffects/saga';
import { watchLogin } from '../features/topics/dispatchingActions/saga';

export default function* rootSaga() {
  yield all([watchFetchUser(), watchLogin()]);
}
