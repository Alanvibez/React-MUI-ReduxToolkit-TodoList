import { combineReducers, configureStore } from '@reduxjs/toolkit';
import countSlice from './slices/count';
import todoSlice from './slices/todo';

const rootReduce = combineReducers({
  counter: countSlice,
  todo: todoSlice,
});
const store = configureStore({
  reducer: rootReduce,
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
