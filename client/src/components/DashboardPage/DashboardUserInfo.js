import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  userSelector,
  fetchUserBytoken,
  clearState,
} from '../../features/User/UserSlice';

const DashboardUserInfo = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearState());
  }, [dispatch]);
  useEffect(() => {
    dispatch(fetchUserBytoken());
  }, [dispatch]);
  const { user, errorMessage } = useSelector(userSelector);

  return (
    <Box display="flex" flexDirection="column">
      {errorMessage && <Typography color="error">{errorMessage}</Typography>}
      <Typography variant="body1" gutterBottom>
        Tên: {user?.name}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Vai trò: {user?.role}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Id: {user?._id}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Gmail: {user?.email}
      </Typography>
    </Box>
  );
};

export default DashboardUserInfo;
