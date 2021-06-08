import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/xhr/api';
import { TokenService } from '../../services/TokenService';

export const signupUser = createAsyncThunk(
  'users/signupUser',
  async (values, thunkAPI) => {
    try {
      let data = await api.post(`/users/signup`, values);
      TokenService.setToken(data.token);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const signinUser = createAsyncThunk(
  'users/login',
  async (values, thunkAPI) => {
    try {
      let data = await api.post(`/users/login`, values);
      // if (values.isAccept) {
      //   TokenService.setToken(data.token);
      // }
      TokenService.setToken(data.token);
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
    },
  },
  extraReducers: {
    [signupUser.fulfilled]: (state, { payload }) => {
      console.log('payload: ', payload);
      state.isFetching = false;
      state.isSuccess = true;
      state.user = payload.user;
      state.token = payload.token;
      return state;
    },
    [signupUser.pending]: (state) => {
      state.isFetching = true;
    },
    [signupUser.rejected]: (state, { payload, error }) => {
      console.log(payload);
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload?.data?.message
        ? payload?.data.message
        : error.message;
    },
    [signinUser.fulfilled]: (state, { payload }) => {
      console.log('payload', payload);
      state.isFetching = false;
      state.isSuccess = true;
      state.user = payload.user;
      state.token = payload.token;
      return state;
    },
    [signinUser.rejected]: (state, { payload, error }) => {
      console.log('payload', payload);
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload?.data?.message
        ? payload?.data.message
        : error.message;
    },
    [signinUser.pending]: (state) => {
      state.isFetching = true;
    },
    [fetchUserBytoken.pending]: (state) => {
      state.isFetching = true;
    },
    [fetchUserBytoken.fulfilled]: (state, { payload }) => {
      console.log(payload);
      state.isFetching = false;
      state.isSuccess = true;
      state.isFetching = false;
      state.user = payload.data;
    },
    [fetchUserBytoken.rejected]: (state, { error, payload }) => {
      console.log(error);
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
