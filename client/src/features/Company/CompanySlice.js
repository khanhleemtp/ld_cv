import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/xhr/api';
import { toast } from 'react-toastify';
import _ from 'lodash';

export const registerCompany = createAsyncThunk(
  'company/registerCompany',
  async (values, thunkAPI) => {
    try {
      await api.post(`/companies`, values);
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

export const updateCompany = createAsyncThunk(
  'company/updateCompany',
  async (values, thunkAPI) => {
    try {
      const { data } = await api.patch(`/companies`);
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
      state.companies = _.dropRightWhile(state.companies, { _id });
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
  },
});

export const { clearState } = companySlice.actions;

export const companySelector = (state) => state.company;
