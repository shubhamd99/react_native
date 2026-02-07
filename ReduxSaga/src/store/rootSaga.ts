import { all } from 'redux-saga/effects';
import { watchFetchUser } from '../features/topics/declarativeEffects/saga';

export default function* rootSaga() {
  yield all([watchFetchUser()]);
}
