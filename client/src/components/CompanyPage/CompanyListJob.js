import { Box } from '@material-ui/core';
import { useSelector } from 'react-redux';
import JobCard from '../FindJobPage/JobCard';
import { companySelector } from '../../features/Company/CompanySlice';

const CompanyListJob = () => {
  const { company } = useSelector(companySelector);

  return (
    <Box>
      {company?.jobs?.map((item) => (
        <JobCard key={item.id} item={item} photo={company?.photo} />
      ))}
    </Box>
  );
};

export default CompanyListJob;
