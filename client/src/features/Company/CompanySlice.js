import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/xhr/api';
import { toast } from 'react-toastify';
import _ from 'lodash';

export const registerCompany = createAsyncThunk(
  'company/registerCompany',
  async ({ data, cb }, thunkAPI) => {
    try {
      await api.post(`/companies`, data);
      cb();
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

export const getAllCompanySearch = createAsyncThunk(
  'company/getAllCompanySearch',
  async (values, thunkAPI) => {
    try {
      const { data } = await api.get(`/companies`);
      console.log('companies', data);
      // const companySearch = data?.map((name) => ({
      //   value: name,
      //   label: name?.toUpperCase(),
      // }));
      console.log('company', data);
      return data;
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
      const { data, total } = await api.get(`/companies${query}`);
      console.log('companies', data);
      return { data, total };
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
      toast.success('C???p nh???t th??nh c??ng');
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteCompany = createAsyncThunk(
  'company/deleteCompany',
  async ({ id, cb }, thunkAPI) => {
    try {
      await api.delete(`/companies/${id}`);
      // cb();
      toast.success('X??a c??ng ty th??nh c??ng');
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const responseCompany = createAsyncThunk(
  'company/responseCompany',
  async (values, thunkAPI) => {
    const { userId, status, companyId, cb } = values;

    try {
      await api.post(`/companies/${companyId}`, { status });
      cb();
      const message =
        status === 'reject'
          ? 'R???t ti???c, ch??ng t??i ph???i t??? ch???i y??u c???u c???a c??ng ty b???n ????'
          : 'Ch??ng t??i ch???p nh???n c??ng ty c???a b???n ????';
      await api.post('/notification', { user: userId, message });
      toast.success('Ph???n h???i th??nh c??ng ????');

      return companyId;
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
    companySearch: [],
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
    pageSize: 0,
  },
  reducers: {
    clearState: (state) => {
      state.companies = [];
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;
      state.errorMessage = '';
    },
  },

  extraReducers: {
    [registerCompany.fulfilled]: (state) => {
      toast.success(
        `????ng k?? tr??? th??nh nh?? tuy???n d???ng th??nh c??ng, H??y ?????i ph???n h???i c???a ch??ng t??i ????`
      );
      state.isFetching = false;
      state.isSuccess = true;
    },
    [responseCompany.fulfilled]: (state, { payload: _id }) => {
      state.companies = _.filter(state.companies, { _id: !_id });
      state.isFetching = false;
      state.isSuccess = true;
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
      toast.error(`${state.errorMessage}????`);
    },
    [responseCompany.rejected]: (state, { payload, error }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload?.data?.message
        ? payload?.data.message
        : error.message;
      toast.error(`${state.errorMessage}????`);
    },
    [getAllCompany.pending]: (state) => {
      state.isFetching = true;
    },
    [getAllCompany.rejected]: (state, { payload, error }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload?.data?.message || error.message;
      toast.error(`${state.errorMessage}????`);
    },
    [getAllCompany.fulfilled]: (state, { payload }) => {
      state.companies = payload?.data;
      state.pageSize = payload.total > 0 && Math.ceil(payload.total / 5);
      state.isFetching = false;
      state.isSuccess = true;
    },

    [getAllCompanySearch.pending]: (state) => {
      state.isFetching = true;
    },
    [getAllCompanySearch.rejected]: (state, { payload, error }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload?.data?.message || error.message;
      toast.error(`${state.errorMessage}????`);
    },
    [getAllCompanySearch.fulfilled]: (state, { payload }) => {
      state.companySearch = payload;
      state.isFetching = false;
      state.isSuccess = true;
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
    [getTopCompany.pending]: (state) => {
      state.isFetching = true;
    },
    [getTopCompany.rejected]: (state, { payload, error }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload?.data?.message || error?.message;
      toast.error(`${state.errorMessage}????`);
    },
    [deleteJob.fulfilled]: (state, { payload: _id }) => {
      let jobs = _.filter(state.company.jobs, { _id: !_id });
      toast.success('X??a vi???c th??nh c??ng');
      state.company = { ...state.company, jobs };
      state.isFetching = false;
      state.isSuccess = true;
    },
    [deleteCompany.fulfilled]: (state, { payload }) => {
      state.companies = state.companies.filter((com) => com._id !== payload);
      state.isFetching = false;
      state.isSuccess = true;
    },
    [deleteCompany.pending]: (state) => {
      state.isFetching = true;
    },
    [deleteCompany.rejected]: (state, { payload, error }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload?.data?.message || error?.message;
      toast.error(`${state.errorMessage}????`);
    },
  },
});

export const { clearState } = companySlice.actions;

export const companySelector = (state) => state.company;
