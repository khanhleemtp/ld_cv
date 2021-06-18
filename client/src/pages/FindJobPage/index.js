import { Box, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
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
      <Pagination
        count={pageSize}
        style={{ margin: 8 }}
        onChange={(e, p) => {
          console.log('current page', p);
          dispatch(updatePage(p));
          console.log('after page', page);
        }}
        variant="outlined"
        shape="rounded"
      />
      <Grid container spacing={1} style={{ paddingLeft: 16, paddingRight: 16 }}>
        {isFetching ? (
          <div>Loading...</div>
        ) : jobs?.length === 0 ? (
          <Typography>Không có kết quả nào phù hợp</Typography>
        ) : (
          jobs?.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item._id}>
              <JobCard
                item={item}
                photo={item?.company?.photo}
                companyName={item?.company?.name}
              />
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
};

export default FindJobPage;
