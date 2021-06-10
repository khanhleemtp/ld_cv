import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    cursor: 'pointer',
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    border: 'none',
    boxShadow: `0 3px 4px 0 rgba(0,0,0,.4)`,
    margin: 4,
    padding: 16,
    '&:hover': {
      transform: `translateY(-16px)`,
      transition: 'all ease 0.3s',
    },
    [theme.breakpoints.up('md')]: {
      borderTop: '4px solid',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      borderTopColor: '#ec407a',
    },
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
  },
}));

const HomeCompanyCard = ({ photo, company, totalJob, location }) => {
  const classes = useStyles();

  return (
    <Paper className={classes.root} variant="outlined">
      <Box className={classes.title}>
        <img
          alt="img"
          src={photo}
          style={{
            maxHeight: '170px',
            maxWidth: '170px',
          }}
        />
      </Box>
      <Box className={classes.title} marginY={4}>
        {company}
      </Box>
      <Box display="flex" alignItems="center" justifyContent="center">
        <Typography color="primary">{totalJob} việc làm</Typography>
        <Box marginX={1}>-</Box>
        <Typography>{location}</Typography>
      </Box>
    </Paper>
  );
};

export default HomeCompanyCard;
