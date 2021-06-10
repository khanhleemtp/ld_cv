import React from 'react';
import { useDispatch } from 'react-redux';
import { responseCompany } from '../../features/Company/CompanySlice';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

export const AdminAction = ({ company }) => {
  const dispatch = useDispatch();
  const handleResponeCompany = (status) => {
    return () => dispatch(responseCompany(status));
  };

  return (
    <Box display="flex" justifyContent="space-between" marginY={2}>
      <Button
        variant="outlined"
        size="medium"
        style={{ marginRight: 16 }}
        onClick={handleResponeCompany({
          status: 'accept',
          id: company._id,
        })}
      >
        Chấp nhận
      </Button>
      <Button
        variant="outlined"
        color="secondary"
        size="large"
        onClick={handleResponeCompany({
          status: 'reject',
          id: company._id,
        })}
      >
        Từ chối
      </Button>
    </Box>
  );
};
