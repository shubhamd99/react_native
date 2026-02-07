import { call, put, takeEvery } from 'redux-saga/effects';
import { inspectEffects, setEffectObjects } from './slice';

// A dummy function to call
const delay = (ms: number) =>
  new Promise<void>(resolve => setTimeout(resolve, ms));

function* inspectEffectsSaga() {
  // Create a Call Effect
  // call() is an effect used to call a function with arguments and return the result
  const callEffect = call(delay, 1000);

  // Create a Put Effect
  // Note: We're not dispatching any real action here for the 'put' demonstration
  // to avoid side effects in this inspection example, or we can put a dummy action.
  const putEffect = put({ type: 'DUMMY_ACTION' });

  // put() is an effect used to dispatch an action to the store
  // Inspect them (convert to string/JSON)
  yield put(
    setEffectObjects({
      callEffect: JSON.stringify(callEffect, null, 2),
      putEffect: JSON.stringify(putEffect, null, 2),
    }),
  );

  // Execute them if needed (optional for this demo, but good to show flow)
  yield callEffect;
  // yield putEffect; // omitting execution of put to avoid cluttering redux devtools with dummy actions
}

export function* watchInspectEffects() {
  yield takeEvery(inspectEffects.type, inspectEffectsSaga);
}
