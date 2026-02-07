import { combineReducers } from '@reduxjs/toolkit';
import declarativeEffectsReducer from '../features/topics/declarativeEffects/slice';

const rootReducer = combineReducers({
  declarativeEffects: declarativeEffectsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
