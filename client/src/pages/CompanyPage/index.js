import { Container, Grid, Box } from '@material-ui/core';
import React from 'react';
import CompanyIntro from '../../components/CompanyPage/CompanyIntro';
import CompanyPageHeader from '../../components/CompanyPage/CompanyPageHeader';
import CompanyReview from '../../components/CompanyPage/CompanyReview';
import CompanyTab from '../../components/CompanyPage/CompanyTab';
import CompanyWhyChoice from '../../components/CompanyPage/CompanyWhyChoice';

const CompanyPage = () => {
  return (
    <Box
      style={{
        background: '#ddd',
        minHeight: '100vh',
      }}
    >
      <Container>
        <Grid container spacing={1} style={{ flexGrow: 1 }}>
          <Grid item md={12}>
            <CompanyPageHeader />
          </Grid>
          <Grid item md={8} style={{ flexGrow: 1 }}>
            <CompanyTab />
          </Grid>
          <Grid item md={4}>
            <CompanyReview style={{ flexGrow: 1 }} />
          </Grid>
          <Grid item md={8} style={{ flexGrow: 1 }}>
            <CompanyIntro />
          </Grid>
          <Grid item md={8} style={{ flexGrow: 1 }}>
            <CompanyWhyChoice />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default CompanyPage;
