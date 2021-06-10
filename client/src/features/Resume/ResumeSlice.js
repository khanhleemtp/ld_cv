import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/xhr/api';
import { toast } from 'react-toastify';
import { resumeDefault } from './dataResume';

export const getResumesUser = createAsyncThunk(
  'resumes/getResumesUser',
  async (values, thunkAPI) => {
    const state = thunkAPI.getState();
    const id = state?.user?.user._id;
    try {
      console.log('gettt');
      let data = await api.get(
        `/users/${id}/resumes?fields=id,header.title,createdAt`
      );
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getResumesById = createAsyncThunk(
  'resumes/getResumesById',
  async ({ id }, thunkAPI) => {
    try {
      console.log('gettt');
      let data = await api.get(`/resumes/${id}`);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteResume = createAsyncThunk(
  'resumes/deleteResume',
  async (values, thunkAPI) => {
    const { id } = values;
    const { resume } = thunkAPI.getState();
    const data = resume?.resumes.filter((item) => item.id !== id);
    try {
      await api.delete(`/resumes/${id}`);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createResume = createAsyncThunk(
  'resumes/createResume',
  async (values, thunkAPI) => {
    const state = thunkAPI.getState();
    console.log(state.user.user.name);
    const name = state?.user?.user.name;

    try {
      const newResumes = await api.post(`/resumes`, resumeDefault(name));
      return newResumes;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateResume = createAsyncThunk(
  'resumes/updateResume',
  async (values, thunkAPI) => {
    console.log('data from resumes', values);
    // console.log(data);
    try {
      const resume = await api.patch(`/resumes/${values.id}`, values);
      return resume;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resumeSlice = createSlice({
  name: 'resume',
  initialState: {
    resumes: [],
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
    resume: {},
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
    [getResumesUser.fulfilled]: (state, { payload }) => {
      console.log('payload: ', payload);
      state.isFetching = false;
      state.isSuccess = true;
      state.resumes = payload.data;
      return state;
    },
    [getResumesUser.pending]: (state) => {
      state.isFetching = true;
    },
    [getResumesUser.rejected]: (state, { payload, error }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload?.data?.message
        ? payload?.data.message
        : error.message;
    },

    [deleteResume.fulfilled]: (state, { payload }) => {
      console.log('payload: ', payload);
      state.resumes = payload;
      state.isFetching = false;
      state.isSuccess = true;
      toast.success('Xóa thành công 😵');
    },

    [deleteResume.pending]: (state) => {
      state.isFetching = true;
    },
    [deleteResume.rejected]: (state, { payload, error }) => {
      console.log(payload);
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload?.data?.message
        ? payload?.data.message
        : error.message;
    },

    [createResume.fulfilled]: (state, { payload }) => {
      console.log('payload: ', payload.data.title);
      const newResume = {
        id: payload?.data?.id,
        title: payload?.data?.header?.title,
        createdAt: payload?.data?.createdAt,
      };
      state.resumes = [...state.resumes, newResume];
      state.isFetching = false;
      state.isSuccess = true;
      toast.success('Thêm thành công 😵');
    },
    [getResumesById.fulfilled]: (state, { payload }) => {
      console.log('payload resume: ', payload.data);
      state.resume = payload.data;
      state.isFetching = false;
      state.isSuccess = true;
      return state;
    },
    [updateResume.fulfilled]: (state, { payload }) => {
      console.log('payload resume: ', payload.data);
      toast.success('Cập nhật thành công');
      state.resume = payload.data;
      state.isFetching = false;
      state.isSuccess = true;
      return state;
    },
  },
});

export const { clearState } = resumeSlice.actions;

export const resumeSelector = (state) => state.resume;
