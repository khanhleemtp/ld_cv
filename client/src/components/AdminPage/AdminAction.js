import React from 'react';
import { useDispatch } from 'react-redux';
import { responseCompany } from '../../features/Company/CompanySlice';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

export const AdminAction = ({ company }) => {
  const userId = company?.user?._id;
  const dispatch = useDispatch();
  const handleResponeCompany = ({ status, companyId }) => {
    return () => dispatch(responseCompany({ status, userId, companyId }));
  };

  return (
    <Box display="flex" justifyContent="space-between" marginY={2}>
      <Button
        variant="outlined"
        size="medium"
        style={{ marginRight: 16 }}
        onClick={handleResponeCompany({
          status: 'accept',
          companyId: company._id,
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
          companyId: company._id,
        })}
      >
        Từ chối
      </Button>
    </Box>
  );
};
