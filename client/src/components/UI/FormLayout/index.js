import React from 'react';
import { makeStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.avatar,
  },
  paperContent: {
    margin: theme.spacing(2),
    padding: theme.spacing(4, 2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));
const FormLayout = ({ title, children, avatar }) => {
  const classes = useStyles();
  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paperContent}>
        <Avatar className={classes.avatar}>{avatar}</Avatar>
        <Typography component="h1" variant="h5">
          {title}
        </Typography>
        {children}
      </Paper>
    </Container>
  );
};

export default FormLayout;
