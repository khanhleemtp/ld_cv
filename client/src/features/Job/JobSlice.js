import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/xhr/api';
import { toast } from 'react-toastify';
import _ from 'lodash';

export const createJob = createAsyncThunk(
  'job/createJob',
  async (values, thunkAPI) => {
    const states = thunkAPI.getState();
    const company = states?.company?.company?._id;
    // console.log(company);
    // console.log(values, company);
    const data = {
      ...values,
      company,
    };
    try {
      await api.post(`/job`, data);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getAllJob = createAsyncThunk(
  'job/getAllJob',
  async (values, thunkAPI) => {
    let query = values?.query || '';
    try {
      const { data } = await api.get(`/job` + query);
      console.log('job', data);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getjobById = createAsyncThunk(
  'job/getjobById',
  async (id, thunkAPI) => {
    try {
      const { data } = await api.get(`/job/${id}`);
      console.log('job', data);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updatejob = createAsyncThunk(
  'job/updatejob',
  async (values, thunkAPI) => {
    const { job } = thunkAPI.getState();
    const id = job.jobs[0]._id;
    try {
      const { data } = await api.patch(`/job/${id}`, values);
      toast.success('Cập nhật thành công');
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const responsejob = createAsyncThunk(
  'job/responsejob',
  async (values, thunkAPI) => {
    const { id, status } = values;

    try {
      await api.post(`/job/${id}`, { status });
      const notify = status === 'reject' ? 'Từ chối' : 'Chấp nhận';
      toast.success(notify + ' thành công 😃');
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const jobSlice = createSlice({
  name: 'job',
  initialState: {
    jobs: [],
    job: {
      title: '',
      company: '',
      tags: [],
      position: '',
      location: '',
      requirements: [],
      descriptions: [],
      salary: '',
      type: '',
      to: '',
    },
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
  },
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;
      state.errorMessage = '';
    },
  },

  extraReducers: {
    [createJob.fulfilled]: (state) => {
      toast.success(`Tạo việc thành công 😅`);
      state.isFetching = false;
      state.isSuccess = true;
    },
    [createJob.pending]: (state) => {
      state.isFetching = true;
    },
    [createJob.rejected]: (state, { payload, error }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload?.data?.message
        ? payload?.data.message
        : error.message;
      toast.error(`${state.errorMessage}😥`);
    },
    [getAllJob.fulfilled]: (state, { payload }) => {
      state.jobs = payload;
      state.isFetching = false;
      state.isSuccess = true;
    },
    [responsejob.fulfilled]: (state, { payload: _id }) => {
      state.jobs = _.dropRightWhile(state.jobs, { _id });
      state.isFetching = false;
      state.isSuccess = true;
    },
    [responsejob.rejected]: (state, { payload, error }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload?.data?.message
        ? payload?.data.message
        : error.message;
      toast.error(`${state.errorMessage}😥`);
    },

    [updatejob.fulfilled]: (state, { payload }) => {
      state.jobs = [payload];
      state.isFetching = false;
      state.isSuccess = true;
    },
    [getjobById.fulfilled]: (state, { payload }) => {
      state.job = payload;
      state.isFetching = false;
      state.isSuccess = true;
    },
  },
});

export const { clearState } = jobSlice.actions;

export const jobSelector = (state) => state.job;
