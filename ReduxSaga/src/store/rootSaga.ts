import { all } from 'redux-saga/effects';
import { watchFetchUser } from '../features/topics/declarativeEffects/saga';
import { watchLogin } from '../features/topics/dispatchingActions/saga';
import { watchInspectEffects } from '../features/topics/effect/saga';

export default function* rootSaga() {
  yield all([watchFetchUser(), watchLogin(), watchInspectEffects()]);
}
