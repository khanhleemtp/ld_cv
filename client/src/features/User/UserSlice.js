import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/xhr/api';
import { TokenService } from '../../services/TokenService';
import { toast } from 'react-toastify';

export const signupUser = createAsyncThunk(
  'users/signupUser',
  async (values, thunkAPI) => {
    const { data: val, cb } = values;
    try {
      let data = await api.post(`/users/signup`, val);
      TokenService.setToken(data.token);
      cb();
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
      TokenService.setToken(data.token);
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

export const getNotifications = createAsyncThunk(
  'user/getNotifications',
  async (id, thunkAPI) => {
    // if (!id) return;
    try {
      const { data } = await api.get(`/notification?user=${id}`);
      console.log('notif');
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteNotification = createAsyncThunk(
  'user/deleteNotification',
  async (id, thunkAPI) => {
    try {
      await api.delete(`/notification/${id}`);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
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
    notifications: [],
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
    },
  },
  extraReducers: {
    [signupUser.fulfilled]: (state, { payload }) => {
      toast.success('Đăng  ký tành công 🚀');
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
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload?.data?.message
        ? payload?.data.message
        : error.message;
      toast.error(state?.errorMessage || 'Hãy thử lại nhé 😞');
    },
    [signinUser.fulfilled]: (state, { payload }) => {
      console.log('payload', payload);
      state.isFetching = false;
      state.isSuccess = true;
      state.user = payload.user;
      state.token = payload.token;
      toast.success('Đăng nhập thành công 🚀');
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
    [getNotifications.fulfilled]: (state, data) => {
      state.notifications = data?.payload || [];
      state.isFetching = false;
      state.isSuccess = true;
      state.isFetching = false;
    },
    [deleteNotification.fulfilled]: (state, { payload: id }) => {
      state.notifications = state?.notifications?.filter(
        (item) => item._id !== id
      );
      state.isFetching = false;
      state.isSuccess = true;
      state.isFetching = false;
    },
  },
});

export const { clearState, logOut } = userSlice.actions;

export const userSelector = (state) => state.user;
