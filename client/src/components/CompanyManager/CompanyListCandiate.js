import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { applySelector, getApplyById } from '../../features/Apply/ApplySlice';
import Grid from '@material-ui/core/Grid';
import CandidateCard from './CandidateCard';

const CompanyListCandiate = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getApplyById(id));
  }, [dispatch, id]);
  const { applies, isFeching } = useSelector(applySelector);
  return isFeching ? (
    <div>Loading..</div>
  ) : (
    <Grid container spacing={2}>
      <Grid item></Grid>
      {applies?.map((a) => {
        console.log('add', a);
        return (
          <Grid key={a._id} item xs={12} sm={12} md={6} lg={4}>
            <CandidateCard user={a?.user} resumes={a?.resumes} id={a?._id} />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default CompanyListCandiate;
