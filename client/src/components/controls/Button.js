import React from 'react';
import { Button as MuiButton, makeStyles } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(3, 0, 2),
  },
}));
const Button = ({ text, size, variant, color, onClick, ...rest }) => {
  const classes = useStyles();
  return (
    <MuiButton
      variant={variant || 'contained'}
      size={size}
      onClick={onClick}
      color={color}
      {...rest}
      classes={{ root: classes.root, label: classes.label }}
    >
      {text}
    </MuiButton>
  );
};

export default Button;
