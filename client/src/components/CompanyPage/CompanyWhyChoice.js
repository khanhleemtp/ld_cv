import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { useSelector } from 'react-redux';
import { companySelector } from '../../features/Company/CompanySlice';
import React from 'react';

const CompanyWhyChoice = () => {
  const { company } = useSelector(companySelector);
  return (
    <>
      <Box>
        <Typography variant="h6" gutterBottom={true}>
          Tại sao bạn chọn chúng tôi
        </Typography>
        <Box paddingLeft={4} marginY={2}>
          {company?.opportunity?.map((e) => (
            <Typography variant="subtitle1" gutterBottom={true} key={e}>
              🦾 {e}
            </Typography>
          ))}
        </Box>
        <Typography variant="h6" gutterBottom={true}>
          Cơ hội khi làm việc tại đây
        </Typography>
        <Box paddingLeft={4} marginY={2}>
          {company?.env?.map((e) => (
            <Typography variant="subtitle1" gutterBottom={true} key={e}>
              💜 {e}
            </Typography>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default CompanyWhyChoice;
