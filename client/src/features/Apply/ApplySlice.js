import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/xhr/api';
import { toast } from 'react-toastify';

export const getApplyByUserId = createAsyncThunk(
  'apply/getApplyByUserId',
  async (_, thunkAPI) => {
    const { user } = thunkAPI.getState();
    const userId = user?.user._id;
    console.log(userId);
    try {
      let { data } = await api.get(`/applies?user=${userId}`);

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getApplyById = createAsyncThunk(
  'apply/getApplyById',
  async (applyId, thunkAPI) => {
    try {
      let { data: job } = await api.get(
        `/applies?job=${applyId}&status=pending`
      );
      if (!job) return;

      console.log('applies--------', job);

      const userApplies = job?.map((apply) => ({
        user: apply?.user,
        applyId: apply._id,
      }));

      const promise = job.map((user) =>
        api.get(
          `/users/${user?.user?._id}/resumes?fields=id,header.title,createdAt,tags,user`
        )
      );

      const data = await Promise.all(promise);

      const resumesArr = data?.map((rs) => ({
        resumes: rs?.data,
        user: rs?.data?.[0]?.user,
      }));

      const info = userApplies.map((apply) => ({
        ...apply,
        id: apply.applyId,
        resumes: resumesArr.filter((rs) => rs.user._id === apply.user._id)?.[0]
          ?.resumes,
      }));

      console.log('rs', info);
      return info;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteApply = createAsyncThunk(
  'apply/deleteApply',
  async (id, thunkAPI) => {
    const { apply } = thunkAPI.getState();
    const data = apply?.applies.filter((item) => item.id !== id);
    try {
      await api.delete(`/applies/${id}`);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createApply = createAsyncThunk(
  'apply/createApply',
  async (cb, thunkAPI) => {
    const { job, user } = thunkAPI.getState();
    const data = {
      job: job?.job?._id,
      user: user?.user?._id,
    };
    const message = `${user?.user?.name?.toUpperCase()} ???? ???ng tuy???n v??o c??ng vi???c ${job?.job?.title?.toUpperCase()} ????`;
    const companyId = job?.job?.companyFrom?.user?._id;
    try {
      await api.post(`/applies`, data);
      await api.post('/notification', { user: companyId, message });
      cb();
      return;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateApply = createAsyncThunk(
  'apply/updateApply',
  async ({ status, cb, id, user }, thunkAPI) => {
    const message =
      status === 'reject'
        ? 'Ch??ng t??i t??? ch???i y??u c???u ???ng tuy???n c???a b???n ????'
        : 'Ch??ng t??i ch???p nh???n ???ng tuy???n c???a b???n ????';
    try {
      await api.patch(`/applies/${id}`, { status });
      await api.post('/notification', { user, message });
      cb();
      return;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const applySlice = createSlice({
  name: 'apply',
  initialState: {
    applies: [],
    resumes: [],
    isError: false,
    isSuccess: false,
    isFetching: false,
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
    [deleteApply.fulfilled]: (state, { payload }) => {
      console.log('payload: ', payload);
      state.applies = payload;
      state.isFetching = false;
      state.isSuccess = true;
      toast.success('X??a th??nh c??ng ????');
    },

    [deleteApply.pending]: (state) => {
      state.isFetching = true;
    },
    [deleteApply.rejected]: (state, { payload, error }) => {
      console.log(payload);
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload?.data?.message || error?.message;
      toast.error('X??a th???t b???i ????');
    },
    [createApply.pending]: (state) => {
      state.isFetching = true;
    },
    [createApply.rejected]: (state, { payload, error }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload?.data?.message || error.message;
      toast.error('???ng tuy???n th???t b???i, h??y th??? l???i ????' + state.errorMessage);
    },
    [createApply.fulfilled]: (state) => {
      toast.success('???ng tuy???n th??nh c??ng, h??y ?????i ph???n h???i t??? ch??ng t??i????');
      state.isFetching = false;
      state.isSuccess = true;
    },
    [getApplyByUserId.fulfilled]: (state, { payload }) => {
      state.applies = payload;
      state.isFetching = false;
      state.isSuccess = true;
      return state;
    },
    [updateApply.fulfilled]: (state, { payload }) => {
      // console.log('payload Apply: ', payload.data);
      toast.success('C???p nh???t c??ng ty th??nh c??ng');
      // state.apply = payload.data;
      state.isFetching = false;
      state.isSuccess = true;
      // return state;
    },
    [updateApply.rejected]: (state, { payload, error }) => {
      toast.error(payload?.data?.message || 'Thao t??c th???t b???i ????');
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload?.data?.message
        ? payload?.data.message
        : error.message;
    },
    [getApplyById.pending]: (state) => {
      state.isFetching = true;
    },
    [getApplyById.fulfilled]: (state, { payload }) => {
      state.applies = payload;
      state.isFetching = false;
      state.isSuccess = true;
      return state;
    },
    [getApplyById.rejected]: (state, { payload, error }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload?.data?.message || error.message;
      toast.error(state.errorMessage);
    },
  },
});

export const { clearState } = applySlice.actions;

export const applySelector = (state) => state.apply;
