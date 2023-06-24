import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CountState } from '../../models/ICounter';

const initialState: CountState = {
  value: 0,
};

const countSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment(state) {
      state.value += 1;
    },
    decrement(state) {
      state.value -= 1;
    },
    incrementByAmount(state, action: PayloadAction<number>) {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = countSlice.actions;

export default countSlice.reducer;
