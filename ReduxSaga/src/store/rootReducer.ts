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
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
