import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface EffectState {
  callEffect: string | null;
  putEffect: string | null;
}

const initialState: EffectState = {
  callEffect: null,
  putEffect: null,
};

const effectSlice = createSlice({
  name: 'effect',
  initialState,
  reducers: {
    inspectEffects: state => {
      state.callEffect = null;
      state.putEffect = null;
    },
    setEffectObjects: (
      state,
      action: PayloadAction<{ callEffect: string; putEffect: string }>,
    ) => {
      state.callEffect = action.payload.callEffect;
      state.putEffect = action.payload.putEffect;
    },
  },
});

export const { inspectEffects, setEffectObjects } = effectSlice.actions;
export default effectSlice.reducer;
