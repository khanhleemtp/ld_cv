import { makeStyles, Paper } from '@material-ui/core';
import React from 'react';
import EmployeeForm from './EmployeeForm';

const useStyles = makeStyles((theme) => ({
  paperContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
}));
const Employees = () => {
  const classes = useStyles();
  return (
    <Paper className={classes.paperContent}>
      <EmployeeForm />
    </Paper>
  );
};

export default Employees;
