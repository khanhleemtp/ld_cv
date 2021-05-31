import React from 'react';
import { makeStyles } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'nowrap',
    padding: theme.spacing(1),
  },
  iconText: {
    background: '#00C091',
    '&:hover': {
      background: '#009c76',
    },
    color: '#fff',
    borderRadius: '20px 0 0 20px',
    minWidth: theme.spacing(18),
  },
  center: {
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
}));

const SettingIcon = ({ icon, text, title }) => {
  const classes = useStyles({ text });

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-around"
      title={title}
      className={clsx(classes.root, { [classes.iconText]: text })}
      paddingX={1}
    >
      <Box className={clsx(classes.center, { [classes.icon]: !text })}>
        {icon}
      </Box>
      {text && <Box className={classes.center}>{text}</Box>}
    </Box>
  );
};

export default SettingIcon;
