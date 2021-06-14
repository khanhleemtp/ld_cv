import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import CompanyPageHeader from '../../components/CompanyPage/CompanyPageHeader';
// import CompanyReview from '../../components/CompanyPage/CompanyReview';
import CompanyTab from '../../components/CompanyPage/CompanyTab';
import {
  companySelector,
  getCompanyById,
} from '../../features/Company/CompanySlice';
import { useDispatch, useSelector } from 'react-redux';

const CompanyPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { company } = useSelector(companySelector);

  useEffect(() => {
    dispatch(getCompanyById(id));
  }, [id, dispatch]);

  return (
    <Box
      style={{
        background: '#ddd',
        minHeight: '100vh',
      }}
    >
      {!company ? (
        <div>Loading...</div>
      ) : (
        <Container>
          <Grid container>
            <Grid item md={12}>
              <CompanyPageHeader company={company} />
            </Grid>
            <Grid item md={8}>
              <CompanyTab />
            </Grid>
          </Grid>
        </Container>
      )}
    </Box>
  );
};

export default CompanyPage;
