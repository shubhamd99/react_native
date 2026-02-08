import { all } from 'redux-saga/effects';
import { watchFetchUser } from '../features/topics/declarativeEffects/saga';
import { watchLogin } from '../features/topics/dispatchingActions/saga';
import { watchInspectEffects } from '../features/topics/effect/saga';
import { watchFetchData } from '../features/topics/errorHandling/saga';
import { watchSagaHelpers } from '../features/topics/sagaHelpers/saga';
import { channelsSaga } from '../features/topics/channels/sagas';
import { watchComposingSagas } from '../features/topics/composingSagas/sagas';
import { watchConcurrencySagas } from '../features/topics/concurrency/sagas';
import { watchForkModelSagas } from '../features/topics/forkModel/sagas';
import { watchFutureActionsSagas } from '../features/topics/futureActions/sagas';
import { watchNonBlockingCallsSagas } from '../features/topics/nonBlockingCalls/sagas';
import { watchRacingEffectsSagas } from '../features/topics/racingEffects/sagas';
import { watchRootSagaPatternsSagas } from '../features/topics/rootSagaPatterns/sagas';
import { watchParallelTasksSagas } from '../features/topics/parallelTasks/sagas';
import { watchTaskCancellationSagas } from '../features/topics/taskCancellation/sagas';

export default function* rootSaga() {
  yield all([
    watchFetchUser(),
    watchLogin(),
    watchInspectEffects(),
    watchFetchData(),
    watchSagaHelpers(),
    channelsSaga(),
    watchComposingSagas(),
    watchConcurrencySagas(),
    watchForkModelSagas(),
    watchFutureActionsSagas(),
    watchNonBlockingCallsSagas(),
    watchRacingEffectsSagas(),
    watchRootSagaPatternsSagas(),
    watchParallelTasksSagas(),
    watchTaskCancellationSagas(),
  ]);
}
