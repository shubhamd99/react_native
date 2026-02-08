import { combineReducers } from '@reduxjs/toolkit';
import declarativeEffectsReducer from '../features/topics/declarativeEffects/slice';
import dispatchingActionsReducer from '../features/topics/dispatchingActions/slice';
import effectReducer from '../features/topics/effect/slice';
import errorHandlingReducer from '../features/topics/errorHandling/slice';
import sagaHelpersReducer from '../features/topics/sagaHelpers/slice';
import channelsReducer from '../features/topics/channels/slice';
import composingSagasReducer from '../features/topics/composingSagas/slice';
import concurrencyReducer from '../features/topics/concurrency/slice';
import forkModelReducer from '../features/topics/forkModel/slice';
import futureActionsReducer from '../features/topics/futureActions/slice';
import nonBlockingCallsReducer from '../features/topics/nonBlockingCalls/slice';
import racingEffectsReducer from '../features/topics/racingEffects/slice';
import rootSagaPatternsReducer from '../features/topics/rootSagaPatterns/slice';
import parallelTasksReducer from '../features/topics/parallelTasks/slice';

const rootReducer = combineReducers({
  declarativeEffects: declarativeEffectsReducer,
  dispatchingActions: dispatchingActionsReducer,
  effect: effectReducer,
  errorHandling: errorHandlingReducer,
  sagaHelpers: sagaHelpersReducer,
  channels: channelsReducer,
  composingSagas: composingSagasReducer,
  concurrency: concurrencyReducer,
  forkModel: forkModelReducer,
  futureActions: futureActionsReducer,
  nonBlockingCalls: nonBlockingCallsReducer,
  racingEffects: racingEffectsReducer,
  rootSagaPatterns: rootSagaPatternsReducer,
  parallelTasks: parallelTasksReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
