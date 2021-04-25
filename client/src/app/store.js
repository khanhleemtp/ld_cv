import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import { userSlice } from '../features/User/UserSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userSlice.reducer,
  },
});
