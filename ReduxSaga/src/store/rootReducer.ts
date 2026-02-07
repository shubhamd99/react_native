import { combineReducers } from '@reduxjs/toolkit';
import declarativeEffectsReducer from '../features/topics/declarativeEffects/slice';
import dispatchingActionsReducer from '../features/topics/dispatchingActions/slice';
import effectReducer from '../features/topics/effect/slice';
import errorHandlingReducer from '../features/topics/errorHandling/slice';

const rootReducer = combineReducers({
  declarativeEffects: declarativeEffectsReducer,
  dispatchingActions: dispatchingActionsReducer,
  effect: effectReducer,
  errorHandling: errorHandlingReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
