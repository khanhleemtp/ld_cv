import { Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';

const CompanyTextIcon = ({ icon, text }) => {
  return (
    <Box alignItems="center" display="flex" textAlign="center">
      <Box
        display="flex"
        alignItems="center"
        color="#6b6767"
        marginRight={0.25}
      >
        {icon}
      </Box>
      <Typography variant="subtitle2">{text}</Typography>
    </Box>
  );
};

export default CompanyTextIcon;
