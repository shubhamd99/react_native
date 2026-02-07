import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddleware({
  // onError is a callback function that is called when an error occurs in a saga.
  onError: (error, { sagaStack: _sagaStack }) => {
    console.error('Do something with the error in global handler', error);
    // console.error('Saga stack:', sagaStack);
  },
});

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;
