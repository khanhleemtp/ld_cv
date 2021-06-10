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

const CompanyItem = ({ company, id }) => {
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
          Công ty: {company?.company}
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
            onClick={handleResponeCompany({ status: 'accept', id })}
          >
            Chấp nhận
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            size="large"
            onClick={handleResponeCompany({ status: 'reject', id })}
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
    dispatch(
      getAllCompany({
        query: '?status=pending',
      })
    );
  }, [dispatch]);
  const { companies } = useSelector(companySelector);
  console.log(companies);
  return (
    <Grid container>
      {companies?.map((company) => (
        <Grid key={company._id} item>
          <CompanyItem company={company} id={company._id} />
        </Grid>
      ))}
    </Grid>
  );
};

export default AdminCompanyList;
