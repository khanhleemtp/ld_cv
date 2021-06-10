import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from '../features/User/UserSlice';
import { resumeSlice } from '../features/Resume/ResumeSlice';

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    resume: resumeSlice.reducer,
  },
});
