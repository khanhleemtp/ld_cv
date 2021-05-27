import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  root: {
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    border: 'none',
    boxShadow: `0 3px 4px 0 rgba(0,0,0,.4)`,
    margin: 4,
    padding: 16,
    '&:hover': {
      transform: `translateY(-16px)`,
      transition: 'all ease 0.3s',
    },
    [theme.breakpoints.up('md')]: {
      width: 130,
      height: 130,
      borderTop: '4px solid',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      borderTopColor: '#ec407a',
    },
  },

  title: {
    fontSize: 24,
  },
}));

export default function CardItem() {
  const classes = useStyles();

  return (
    <Paper className={classes.root} variant="outlined">
      <Box className={classes.title}>🧟‍♀️</Box>
      <Box className={classes.title}>Service</Box>
    </Paper>
  );
}
