import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from '../features/User/UserSlice';
import { resumeSlice } from '../features/Resume/ResumeSlice';
import { companySlice } from '../features/Company/CompanySlice';
import { jobSlice } from '../features/Job/JobSlice';

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    resume: resumeSlice.reducer,
    company: companySlice.reducer,
    job: jobSlice.reducer,
  },
});
