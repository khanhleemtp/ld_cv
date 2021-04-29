import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& .MuiFormControl-root': {
      marginTop: theme.spacing(1),
    },
  },
}));
const useForm = (initialValues, validateOnChange = false, validate) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    if (validateOnChange) validate({ [name]: value });
  };
  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
  };

  return {
    values,
    setValues,
    handleInputChange,
    errors,
    setErrors,
    resetForm,
  };
};

export function Form({ children, ...rest }) {
  const classes = useStyles();

  return (
    <form className={classes.root} {...rest} autoComplete="on" noValidate>
      {children}
    </form>
  );
}

export default useForm;
