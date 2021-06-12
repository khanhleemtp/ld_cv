import Grid from '@material-ui/core/Grid';
import { useDispatch, useSelector } from 'react-redux';
import JobCard from '../FindJobPage/JobCard';
import {
  companySelector,
  getCompanyById,
} from '../../features/Company/CompanySlice';
import CompanyControlJob from '../CompanyManager/CompanyControlJob';
import { useEffect } from 'react';
import { userSelector } from '../../features/User/UserSlice';

const CompanyListJob = () => {
  const { user } = useSelector(userSelector);
  const companyId = user?.company?._id;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCompanyById(companyId));
  }, [dispatch, companyId]);

  const { company } = useSelector(companySelector);
  return (
    <Grid container spacing={2}>
      {company?.jobs?.map((i) => (
        <Grid key={i.id} item xs={12} sm={12} md={6} lg={4}>
          <CompanyControlJob jobId={i._id} />
          <JobCard
            item={i}
            photo={company?.photo}
            companyName={company?.name}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default CompanyListJob;
