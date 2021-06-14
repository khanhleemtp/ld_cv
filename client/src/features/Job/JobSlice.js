import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/xhr/api';
import { toast } from 'react-toastify';
import _ from 'lodash';

const limit = 5;

export const createJob = createAsyncThunk(
  'job/createJob',
  async (values, thunkAPI) => {
    const states = thunkAPI.getState();
    const company = states?.company?.company?._id;
    const { data: job, cb } = values;
    const data = {
      ...job,
      company,
    };
    try {
      await api.post(`/job`, data);
      cb();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getAllJob = createAsyncThunk(
  'job/getAllJob',
  async (values, thunkAPI) => {
    // const { job } = thunkAPI.getState();
    // console.log('jobssssss', job?.page);
    const { page, filter } = values;
    try {
      const { data, total } = await api.post(
        `/job/data-search?page=${page}&limit=${limit}`,
        filter
      );
      // console.log('jobSeacrch', data);
      console.log('toal', total);
      let pageSize = 0;
      if (total > 0) {
        pageSize = Math.ceil(total / limit);
      }
      return { data, pageSize };
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
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getSuggestCandidate = createAsyncThunk(
  'job/getSuggestCandidate',
  async (id, thunkAPI) => {
    try {
      const { data } = await api.get(`/suggest/${id}`);
      let math80 = _.map(data?.job80, (item) => ({ ...item, status: '80%' }));
      let math30 = _.map(data?.job30, (item) => ({ ...item, status: '30%' }));
      const math = _.concat(math30, math80);
      console.log('math ...............final math', math, data.job);

      return {
        rows: math,
        job: data.job,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getSuggestJob = createAsyncThunk(
  'job/getSuggestJob',
  async (id, thunkAPI) => {
    try {
      const { data } = await api.get(`/helper/${id}`);
      let math80 = _.map(data?.job80, (item) => ({ ...item, status: '80%' }));
      let math30 = _.map(data?.job30, (item) => ({ ...item, status: '30%' }));
      const math = _.concat(math30, math80);
      return {
        rows: math,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateJob = createAsyncThunk(
  'job/updatejob',
  async (values, thunkAPI) => {
    const { data: newJob, id, cb } = values;
    try {
      const { data } = await api.patch(`/job/${id}`, newJob);
      cb();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getJobSearch = createAsyncThunk(
  'job/getJobSearch',
  async (id, thunkAPI) => {
    try {
      const { data } = await api.get(`/job/data-search`);
      console.log('job', data);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const jobSlice = createSlice({
  name: 'job',
  initialState: {
    jobs: [],
    search: {},
    filter: {},
    pageSize: 0,
    page: 1,
    position: [],
    suggestCv: [],
    suggestJob: [],
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
    updateFilter(state, action) {
      state.filter = {
        ...state.filter,
        ...action.payload,
      };
      return state;
    },
    updatePage(state, action) {
      console.log('page payload', action.payload);
      state.page = action.payload;
      return state;
    },
  },

  extraReducers: {
    [createJob.fulfilled]: (state) => {
      toast.success(`Tạo việc làm thành công 😅`);
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
    [getAllJob.pending]: (state) => {
      state.isFetching = true;
    },
    [getAllJob.fulfilled]: (state, { payload }) => {
      const { data, pageSize } = payload;
      state.jobs = data;
      state.pageSize = pageSize;
      state.isFetching = false;
      state.isSuccess = true;
    },
    [getAllJob.rejected]: (state, { payload, error }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload?.data?.message || error?.message;
      toast.error(`${state.errorMessage}😥`);
    },

    [updateJob.rejected]: (state, { payload, error }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload?.data?.message
        ? payload?.data.message
        : error.message;
      toast.error(`${state.errorMessage}😥`);
    },

    [getjobById.fulfilled]: (state, { payload }) => {
      state.job = payload;
      state.isFetching = false;
      state.isSuccess = true;
    },

    [getSuggestCandidate.pending]: (state) => {
      state.isFetching = true;
    },
    [getSuggestCandidate.rejected]: (state, { payload, error }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload?.data?.message || error?.message;
      toast.error(`${state?.errorMessage}😥`);
    },
    [getSuggestCandidate.fulfilled]: (state, { payload }) => {
      state.suggestCv = payload;
      state.isFetching = false;
      state.isSuccess = true;
    },

    [getSuggestJob.pending]: (state) => {
      state.isFetching = true;
    },
    [getSuggestJob.rejected]: (state, { payload, error }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload?.data?.message || error?.message;
      toast.error(`${state?.errorMessage}😥`);
    },
    [getSuggestJob.fulfilled]: (state, { payload }) => {
      state.suggestJob = payload;
      state.isFetching = false;
      state.isSuccess = true;
    },

    [getJobSearch.pending]: (state) => {
      state.isFetching = true;
    },
    [getJobSearch.fulfilled]: (state, { payload }) => {
      state.search = payload;
      state.isFetching = false;
      state.isSuccess = true;
    },
    [getJobSearch.rejected]: (state, { payload, error }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload?.data?.message || error?.message;
      toast.error(`${state?.errorMessage}😥`);
    },
  },
});

export const { clearState, updateFilter, updatePage } = jobSlice.actions;
export const jobSelector = (state) => state.job;
