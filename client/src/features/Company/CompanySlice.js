import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/xhr/api';
import { toast } from 'react-toastify';
import _ from 'lodash';

export const registerCompany = createAsyncThunk(
  'company/registerCompany',
  async (values, thunkAPI) => {
    try {
      await api.post(`/companies`, values);
      return;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteJob = createAsyncThunk(
  'company/deleteJob',
  async (id, thunkAPI) => {
    try {
      await api.delete(`/job/${id}`);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getAllCompany = createAsyncThunk(
  'company/getAllCompany',
  async (values, thunkAPI) => {
    let query = values?.query || '';
    try {
      const { data } = await api.get(`/companies${query}`);
      console.log('companies', data);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getTopCompany = createAsyncThunk(
  'company/getTopCompany',
  async (values, thunkAPI) => {
    try {
      const { data } = await api.get(`/companies/top-8-company`);
      console.log('companies', data);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getCompanyById = createAsyncThunk(
  'company/getCompanyById',
  async (id, thunkAPI) => {
    try {
      const { data } = await api.get(`/companies/${id}`);
      console.log('company', data);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateCompany = createAsyncThunk(
  'company/updateCompany',
  async (values, thunkAPI) => {
    const { company } = thunkAPI.getState();
    const id = company?.company._id;
    try {
      const { data } = await api.patch(`/companies/${id}`, values);
      toast.success('Cập nhật thành công');
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const responseCompany = createAsyncThunk(
  'company/responseCompany',
  async (values, thunkAPI) => {
    const { id, status } = values;

    try {
      await api.post(`/companies/${id}`, { status });
      const notify = status === 'reject' ? 'Từ chối' : 'Chấp nhận';
      toast.success(notify + ' thành công 😃');
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const companySlice = createSlice({
  name: 'company',
  initialState: {
    companies: [],
    company: {},
    topCom: [],
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
    [registerCompany.fulfilled]: (state) => {
      toast.success(`Đăng ký thành cônge 😅`);
      state.isFetching = false;
      state.isSuccess = true;
    },
    [getAllCompany.fulfilled]: (state, { payload }) => {
      state.companies = payload;
      state.isFetching = false;
      state.isSuccess = true;
    },
    [responseCompany.fulfilled]: (state, { payload: _id }) => {
      state.companies = _.filter(state.companies, { _id: !_id });
      state.isFetching = false;
      state.isSuccess = true;
    },
    [responseCompany.rejected]: (state, { payload, error }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload?.data?.message
        ? payload?.data.message
        : error.message;
      toast.error(`${state.errorMessage}😥`);
    },
    [registerCompany.pending]: (state) => {
      state.isFetching = true;
    },
    [registerCompany.rejected]: (state, { payload, error }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload?.data?.message
        ? payload?.data.message
        : error.message;
      toast.error(`${state.errorMessage}😥`);
    },
    [updateCompany.fulfilled]: (state, { payload }) => {
      state.company = payload;
      state.isFetching = false;
      state.isSuccess = true;
    },
    [getCompanyById.fulfilled]: (state, { payload }) => {
      state.company = payload;
      state.isFetching = false;
      state.isSuccess = true;
    },
    [getTopCompany.fulfilled]: (state, { payload }) => {
      state.topCom = payload;
      state.isFetching = false;
      state.isSuccess = true;
    },
    [deleteJob.fulfilled]: (state, { payload: _id }) => {
      let jobs = _.filter(state.company.jobs, { _id: !_id });
      console.log('newJobs', jobs);
      toast.success('Xóa thành công');
      state.company = { ...state.company, jobs };
      state.isFetching = false;
      state.isSuccess = true;
    },
  },
});

export const { clearState } = companySlice.actions;

export const companySelector = (state) => state.company;
