import { Box, Container, Grid, makeStyles, Paper } from '@material-ui/core';
import React, { useEffect } from 'react';
import JobCard from '../../components/FindJobPage/JobCard';
import SeachJob from '../../components/UI/SeachJob';
import Pagination from '@material-ui/lab/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllJob,
  jobSelector,
  updatePage,
} from '../../features/Job/JobSlice';

const useStyles = makeStyles((theme) => ({
  search: {
    background: theme.palette.grey[200],
    marginTop: theme.spacing(1),
    padding: theme.spacing(2),
  },
}));

const FindJobPage = () => {
  const dispatch = useDispatch();
  const { jobs, isFetching, filter, pageSize, page } = useSelector(jobSelector);

  useEffect(() => {
    dispatch(getAllJob({ filter, page }));
  }, [dispatch, filter, page]);

  // console.log('filter: ', filter);
  const classes = useStyles();
  return (
    <Box>
      <Paper className={classes.search}>
        <SeachJob />
      </Paper>
      <Container
        maxWidth="lg"
        style={{
          marginTop: 24,
        }}
      >
        <Grid container>
          <Grid item md={6}>
            <Box
              style={{
                maxHeight: '360px',
                overflow: 'auto',
              }}
            >
              {isFetching ? (
                <div>Loading...</div>
              ) : (
                jobs?.map((item) => (
                  <JobCard
                    key={item._id}
                    item={item}
                    photo={item?.company?.photo}
                    companyName={item?.company?.name}
                  />
                ))
              )}
            </Box>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              marginY={2}
            >
              <Pagination
                count={pageSize}
                // page={page}
                onChange={(e, p) => {
                  console.log('current page', p);
                  dispatch(updatePage(p));
                  console.log('after page', page);
                }}
                variant="outlined"
                shape="rounded"
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default FindJobPage;
