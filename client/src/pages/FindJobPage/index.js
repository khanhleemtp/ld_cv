import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Paper,
} from '@material-ui/core';
import React from 'react';
import JobCard from '../../components/FindJobPage/JobCard';
import SeachJob from '../../components/UI/SeachJob';
import Pagination from '@material-ui/lab/Pagination';
import CompanyPageHeader from '../../components/CompanyPage/CompanyPageHeader';

const FindJobPage = () => {
  return (
    <Box>
      <Container
        style={{
          background: '#ddd',
        }}
      >
        <SeachJob />
      </Container>
      <Container
        maxWidth="lg"
        style={{
          marginTop: 24,
        }}
      >
        <Grid container>
          <Grid
            item
            md={6}
            style={{
              maxHeight: '640px',
              overflow: 'auto',
            }}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <JobCard key={item} />
            ))}
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              marginY={2}
            >
              <Pagination count={10} variant="outlined" shape="rounded" />
            </Box>
          </Grid>
          <Grid item md={6}>
            <Paper>
              <CompanyPageHeader />
              <Box display="flex" flexDirection="column" padding={4}>
                <Typography variant="h5" gutterBottom={true}>
                  Web developer (PHP/MySQL, CI, ReactJS)
                </Typography>
                <Typography variant="body2" gutterBottom={true}>
                  OCMG
                </Typography>
                <Box flexGrow={1} marginY={3}>
                  <Button variant="contained" color="primary" fullWidth>
                    Apply Now
                  </Button>
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default FindJobPage;
