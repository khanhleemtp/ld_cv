import React, { useCallback, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Container } from '@material-ui/core';

const useStyles = makeStyles((theme) => {
  return {
    root: {
      flexGrow: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      // position: 'fixed',
      top: (fixed) => {
        if (fixed) return `64px`;
        else return `120px`;
      },
      position: (fixed) => {
        if (fixed) return `fixed`;
        else return `initial`;
      },
      transition: 'top ease-out 0.2s',
    },
  };
});

export default function CenteredTabs({ list }) {
  const [value, setValue] = useState(0);
  const [fixed, setFixed] = useState(false);
  const classes = useStyles(fixed);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChangeTab = useCallback(() => {
    if (window.scrollY >= 140) {
      setFixed(true);
    } else setFixed(false);
  }, []);

  useEffect(() => {
    // const handleChangeFixed = () => {
    //   if (window.scrollY >= 140) {
    //     setFixed(true);
    //   } else setFixed(false);
    // };
    window.addEventListener('scroll', handleChangeTab);
    return () => {
      window.removeEventListener('scroll', handleChangeTab);
    };
  }, [handleChangeTab]);

  return (
    <Paper className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        // centered
        className={classes.tab}
        scrollButtons="on"
        variant="scrollable"
      >
        {list.map((item) => (
          <Tab key={item.path} label={item.label} />
        ))}
      </Tabs>
    </Paper>
  );
}
