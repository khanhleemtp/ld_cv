import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { companySelector } from '../../features/Company/CompanySlice';
import React from 'react';
const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
  },

  tag: {
    margin: theme.spacing(0.5),
  },
}));
const CompanyWhyChoice = () => {
  const classes = useStyles();
  const { company } = useSelector(companySelector);
  return (
    <Paper className={classes.root}>
      <Box>
        <Typography variant="h5" gutterBottom={true}>
          Tại sao bạn chọn chúng tôi
        </Typography>
        <Box paddingLeft={4} marginY={2}>
          {company?.opportunity?.map((e) => (
            <Typography variant="subtitle1" gutterBottom={true} key={e}>
              🦾 {e}
            </Typography>
          ))}
        </Box>
        <Typography variant="h5" gutterBottom={true}>
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
    </Paper>
  );
};

export default CompanyWhyChoice;
