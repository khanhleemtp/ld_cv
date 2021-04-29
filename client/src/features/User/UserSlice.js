import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { client } from '../../api/client';
import api from '../../api/api';
import { TokenService } from '../../services/TokenService';
const baseUrl = process.env.REACT_APP_API_URL;

export const signupUser = createAsyncThunk(
  'users/signupUser',
  async (values, thunkAPI) => {
    try {
      let data = await client.post(`${baseUrl}/users/signup`, values);
      TokenService.setToken(data.token);
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const signinUser = createAsyncThunk(
  'users/login',
  async (values, thunkAPI) => {
    try {
      let data = await client.post(`${baseUrl}/users/login`, values);
      if (values.isAccept) {
        TokenService.setToken(data.token);
      }
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
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
      const data = await api({
        url: '/users/me',
        cancelToken: source.token,
        method: 'GET',
      });
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }

    // try {
    //   const { data } = await axios.get(`${baseUrl}/users/me`, {
    //     cancelToken: source.token,
    //     headers: {
    //       authorization: 'Bearer ' + token,
    //     },
    //   });
    //   return data;
    // } catch (error) {
    //   if (error.response) {
    //     return rejectWithValue(error.response.data);
    //   } else if (error.request) {
    //     console.log(error.request);
    //   } else {
    //     console.log(error.message);
    //   }
    // }
    // if (data.status === 'fail') {
    //   rejectWithValue(data);
    // }
  }

  //   try {
  //     thunkAPI.signal.addEventListener('abort', () => {
  //       console.log('Abort.....');
  //     });
  //     let data = await client.get(`${baseUrl}/users/me`, {
  //       headers: {
  //         Authorization: 'Bearer ' + token,
  //       },

  //       signal: thunkAPI.signal,
  //     });
  //     console.log(data);
  //     return data;
  //   } catch (e) {
  //     return thunkAPI.rejectWithValue(e);
  //   }
  // }
);

// export const fetchUserBytoken = createAsyncThunk(
//   'users/fetchUserByToken',
//   async ({ token }, thunkAPI) => {
//     try {
//       const response = await fetch(
//         'https://mock-user-auth-server.herokuapp.com/api/v1/users',
//         {
//           method: 'GET',
//           headers: {
//             Accept: 'application/json',
//             Authorization: token,
//             'Content-Type': 'application/json',
//           },
//         }
//       );
//       let data = await response.json();
//       console.log('data', data, response.status);

//       if (response.status === 200) {
//         return { ...data };
//       } else {
//         return thunkAPI.rejectWithValue(data);
//       }
//     } catch (e) {
//       console.log('Error', e.response.data);
//       return thunkAPI.rejectWithValue(e.response.data);
//     }
//   }
// );

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
    [signupUser.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.message;
    },
    [signinUser.fulfilled]: (state, { payload }) => {
      console.log('payload', payload);
      state.isFetching = false;
      state.isSuccess = true;
      state.user = payload.user;
      state.token = payload.token;
      return state;
    },
    [signinUser.rejected]: (state, { payload }) => {
      console.log('payload', payload);
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.message;
    },
    [signinUser.pending]: (state) => {
      state.isFetching = true;
    },
    [fetchUserBytoken.pending]: (state) => {
      state.isFetching = true;
    },
    [fetchUserBytoken.fulfilled]: (state, { payload }) => {
      // console.log(payload);
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

export const { clearState } = userSlice.actions;

export const userSelector = (state) => state.user;
