import { combineReducers } from '@reduxjs/toolkit';
import declarativeEffectsReducer from '../features/topics/declarativeEffects/slice';
import dispatchingActionsReducer from '../features/topics/dispatchingActions/slice';
import effectReducer from '../features/topics/effect/slice';
import errorHandlingReducer from '../features/topics/errorHandling/slice';
import sagaHelpersReducer from '../features/topics/sagaHelpers/slice';

const rootReducer = combineReducers({
  declarativeEffects: declarativeEffectsReducer,
  dispatchingActions: dispatchingActionsReducer,
  effect: effectReducer,
  errorHandling: errorHandlingReducer,
  sagaHelpers: sagaHelpersReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
