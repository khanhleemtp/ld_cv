import React, { useEffect, useState } from 'react';
import { Grid, Box, Typography, Paper } from '@material-ui/core';
import { Link } from 'react-router-dom';
import api from '../../api/xhr/api';

const CompanyCard = ({ company }) => {
  const [jobs, setJobs] = useState({});
  useEffect(() => {
    let query = `?company=${company._id}`;
    const getData = async () => {
      const data = await api.get(`/job` + query);
      console.log(data);
      setJobs(data);
      return data;
    };
    getData();
  }, [company]);
  return (
    <Grid item key={company._id} xs="12" md="3">
      <Link to={`/company/${company._id}`} style={{ textDecoration: 'none' }}>
        <Paper style={{ marginTop: 8 }}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            padding={2}
          >
            <Box>
              <img src={company?.photo} alt="" width={80} height={80} />
            </Box>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
            >
              <Typography
                variant="body2"
                color="primary"
                style={{
                  textTransform: 'capitalize',
                }}
              >
                {company?.name} - {jobs?.total} việc làm
              </Typography>
              <Typography
                variant="body2"
                component="p"
                style={{
                  width: 200,
                  textTransform: 'capitalize',
                }}
                noWrap
              >
                {company?.location}
              </Typography>
              <Typography variant="body2" color="primary">
                {company?.type}
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Link>
    </Grid>
  );
};

export default CompanyCard;
