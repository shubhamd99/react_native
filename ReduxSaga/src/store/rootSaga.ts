import { all } from 'redux-saga/effects';
import { watchFetchUser } from '../features/topics/declarativeEffects/saga';
import { watchLogin } from '../features/topics/dispatchingActions/saga';
import { watchInspectEffects } from '../features/topics/effect/saga';
import { watchFetchData } from '../features/topics/errorHandling/saga';
import { watchSagaHelpers } from '../features/topics/sagaHelpers/saga';
import { channelsSaga } from '../features/topics/channels/sagas';

export default function* rootSaga() {
  yield all([
    watchFetchUser(),
    watchLogin(),
    watchInspectEffects(),
    watchFetchData(),
    watchSagaHelpers(),
    channelsSaga(),
  ]);
}
