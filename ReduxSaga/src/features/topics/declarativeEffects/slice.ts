import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  id: string;
  name: string;
}

interface DeclarativeEffectsState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: DeclarativeEffectsState = {
  user: null,
  loading: false,
  error: null,
};

const declarativeEffectsSlice = createSlice({
  name: 'declarativeEffects',
  initialState,
  reducers: {
    fetchUserRequest: (state, _action: PayloadAction<string>) => {
      state.loading = true;
      state.error = null;
    },
    fetchUserSuccess: (state, action: PayloadAction<User>) => {
      state.loading = false;
      state.user = action.payload;
    },
    fetchUserFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchUserRequest, fetchUserSuccess, fetchUserFailure } =
  declarativeEffectsSlice.actions;
export default declarativeEffectsSlice.reducer;
