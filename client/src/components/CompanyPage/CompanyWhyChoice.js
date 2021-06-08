import { Typography, Box, Paper, Chip, makeStyles } from '@material-ui/core';
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

  return (
    <Paper className={classes.root}>
      <Box>
        <Typography variant="h5" gutterBottom={true}>
          Tại sao bạn chọn chúng tôi
        </Typography>
        <Box paddingLeft={4} marginY={2}>
          <Typography variant="h6" gutterBottom={true}>
            🦾 Global Exposure
          </Typography>
          <Typography variant="h6" gutterBottom={true}>
            🦾 Fast Track Career
          </Typography>
          <Typography variant="h6" gutterBottom={true}>
            🦾Diversified Jobs & Technologies
          </Typography>
        </Box>
        <Typography variant="body2" gutterBottom={true}>
          You can catch up with unlimited opportunities to work and live in
          different countries over the world, join world class software projects
          with trendiest technologies, innovative products & services that bring
          great values to millions of people around the world, such as the
          world’s largest airplane brand, biggest broadcast satellite services
          in the US, the leading manufacturer of postage meter and mailroom
          equipment in EU, etc.
        </Typography>
        <Typography variant="body2" gutterBottom={true}>
          You can choose your career path to become a technology expert or a
          professional manager which best fits your desire, qualifications and
          characteristics in an equal opportunity and open-minded culture
          workplace.
        </Typography>
      </Box>
    </Paper>
  );
};

export default CompanyWhyChoice;
