import {
  Grid,
  Box,
  TextField,
  Button,
  Container,
  Typography,
  Paper,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  companySelector,
  getAllCompany,
} from '../../features/Company/CompanySlice';
import Pagination from '@material-ui/lab/Pagination';
import CompanyCard from '../../components/FindCompanyPage/CompanyCard';

const FindCompanyPage = () => {
  const [qr, setQr] = useState('');
  const [page, setPage] = useState(1);

  const { control, handleSubmit } = useForm();

  const dispatch = useDispatch();

  useEffect(() => {
    // let query = new RegExp(qr, 'i');
    dispatch(
      getAllCompany({
        query: qr
          ? `?status=accept&name[regex]=${qr}&name[options]=i&limit=5?page=${page}`
          : `?status=accept&limit=5&page=${page}`,
      })
    );
  }, [dispatch, qr, page]);

  const { companies, pageSize, isFetching } = useSelector(companySelector);
  return (
    <form onSubmit={handleSubmit((data) => setQr(data.name))}>
      <Box>
        <Container maxWidth="xs" style={{ marginTop: 6, marginBottom: 6 }}>
          <Typography variant="h6">Tìm kiếm công ty</Typography>
          <Box display="flex" alignItems="center">
            <Controller
              render={({ field }) => (
                <TextField {...field} variant="outlined" size="small" />
              )}
              name="name"
              control={control}
              defaultValue=""
            />
            <Button
              variant="contained"
              color="primary"
              style={{ marginLeft: 8 }}
              type="submit"
            >
              Tìm kiếm
            </Button>
          </Box>
        </Container>
        <Pagination
          count={pageSize}
          variant="outlined"
          shape="rounded"
          onChange={(event, page) => setPage(page)}
        />
        <Container maxWidth="xl">
          <Grid container spacing={2}>
            {companies?.length === 0 && !isFetching && (
              <Box margin={4}>Không có kết quả nào phù hợp</Box>
            )}
            {companies?.map((company) => (
              <CompanyCard key={company._id} company={company} />
            ))}
          </Grid>
        </Container>
      </Box>
    </form>
  );
};

export default FindCompanyPage;
