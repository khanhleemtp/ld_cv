import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  companySelector,
  getAllCompany,
  responseCompany,
} from '../../features/Company/CompanySlice';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import AdminCompanyItem from './AdminCompanyItem';
import { AdminAction } from './AdminAction';
import { clearState } from '../../features/Company/CompanySlice';

export const CompanyItem = ({ company }) => {
  const dispatch = useDispatch();

  const handleResponeCompany = (status) => {
    return () => dispatch(responseCompany(status));
  };

  return (
    <Paper
      variant="outlined"
      square
      elevation={2}
      style={{
        margin: 16,
        padding: 16,
        maxWidth: 360,
      }}
    >
      <Box>
        <Box></Box>
        <Typography variant="h6" color="primary">
          Công ty: {company?.name}
        </Typography>
        <Typography variant="body1">User: {company?.user?.name}</Typography>
        <Typography variant="body1">Email: {company?.user?.email}</Typography>
        <Typography variant="body1">Số điện thoại: {company?.phone}</Typography>
        <Typography variant="body1">Vị trí: {company?.position}</Typography>
        <Typography variant="body1">Địa điểm: {company?.location}</Typography>
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
      </Box>
    </Paper>
  );
};

const AdminCompanyList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearState());
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      getAllCompany({
        query: '?status=pending',
      })
    );
  }, [dispatch]);
  const { companies, isFetching } = useSelector(companySelector);
  return (
    <Grid container>
      {isFetching ? (
        <div>Loading...</div>
      ) : (
        companies?.map((company) => (
          <Grid key={company.name} item>
            <AdminCompanyItem
              company={company}
              btnAction={<AdminAction company={company} />}
            />
          </Grid>
        ))
      )}
    </Grid>
  );
};

export default AdminCompanyList;
