import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/xhr/api';
import { TokenService } from '../../services/TokenService';
import { toast } from 'react-toastify';

export const signupUser = createAsyncThunk(
  'users/signupUser',
  async (values, thunkAPI) => {
    try {
      let data = await api.post(`/users/signup`, values);
      TokenService.setToken(data.token);
      TokenService.setToken(data?.user?.role, 'roles');

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const signinUser = createAsyncThunk(
  'users/login',
  async (values, thunkAPI) => {
    console.log(values);
    const { data: val, cb } = values;
    try {
      let data = await api.post(`/users/login`, val);
      // if (values.isAccept) {
      //   TokenService.setToken(data.token);
      // }
      console.log(val, cb);
      TokenService.setToken(data.token);
      console.log('data', data);
      TokenService.setToken(data?.user?.role, 'roles');
      cb();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const fetchUserBytoken = createAsyncThunk(
  'users/fetchUserByToken',
  async (_, thunkAPI) => {
    const source = axios.CancelToken.source();
    const { signal, rejectWithValue } = thunkAPI;
    signal.addEventListener('abort', () => {
      console.log('Not fetchiing data');
      source.cancel();
    });

    try {
      const data = await api.get('/users/me', { cancelToken: source.token });
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: {},
    token: null,
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
    logOut: (state) => {
      state.user = {};
      state.token = null;
      state.isFetching = false;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = '';
      TokenService.removeToken('ld-token');
      TokenService.removeToken('roles');
    },
  },
  extraReducers: {
    [signupUser.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.user = payload.user;
      state.token = payload.token;
      toast.success('Đăng ký thành công 💘');
      return state;
    },
    [signupUser.pending]: (state) => {
      state.isFetching = true;
    },
    [signupUser.rejected]: (state, { payload, error }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload?.data?.message
        ? payload?.data.message
        : error.message;
      toast.error(state.errorMessage);
    },
    [signinUser.fulfilled]: (state, { payload }) => {
      console.log('payload', payload);
      state.isFetching = false;
      state.isSuccess = true;
      state.user = payload.user;
      state.token = payload.token;
      toast.success('Đăng nhập thành công 💘');
      return state;
    },
    [signinUser.rejected]: (state, { payload, error }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload?.data?.message
        ? payload?.data.message
        : error.message;
      toast.warn(state.errorMessage);
    },
    [signinUser.pending]: (state) => {
      state.isFetching = true;
    },
    [fetchUserBytoken.pending]: (state) => {
      state.isFetching = true;
    },
    [fetchUserBytoken.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isFetching = false;
      state.user = payload.data;
    },
    [fetchUserBytoken.rejected]: (state, { error, payload }) => {
      state.errorMessage = payload?.data?.message
        ? payload?.data.message
        : error.message;
      state.isFetching = false;
      state.isError = true;
    },
  },
});

export const { clearState, logOut } = userSlice.actions;

export const userSelector = (state) => state.user;
