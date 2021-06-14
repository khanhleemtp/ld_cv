import React from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Footer from './Footer';
import TopNav from './TopNav';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    overflow: 'hidden',
  },
  page: {
    width: '100%',
    background: '#f9f9f9',
  },
  toolbar: theme.mixins.toolbar,

  nav: {
    background: '#fff',
    color: '#000',
    display: 'flex',
    boxShadow: `0 2px 4px 0 rgba(0,0,0,.2)`,
  },
  navNotActive: {
    boxShadow: 'none',
    color: '#000',
    background: theme.palette.primary.header,
  },
  title: {
    marginRight: theme.spacing(4),
    color: theme.palette.primary.main,
    fontSize: 28,
    cursor: 'pointer',
  },
  boxGrow: {
    display: 'flex',
    alignItems: 'center',
    flexGrow: 1,
  },
  list: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
    display: 'flex',
  },
  listItem: {
    cursor: 'pointer',
    padding: 0,
    marginLeft: 24,
    userSelect: 'none',
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
  isHidden: {
    display: 'none',
  },
  btn: {
    justifySelf: 'end',
    [theme.breakpoints.down('sm')]: {
      width: 160,
    },
    width: 200,
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
      background: theme.palette.primary.dark,
    },
    marginRight: theme.spacing(1),
  },
  menuButton: {
    marginLeft: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
    },
    display: 'none',
  },
}));

const LayoutPage = ({ children }) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      {/* <Navbar /> */}
      <TopNav />
      <div className={classes.page}>
        <div className={classes.toolbar}></div>
        {children}
        <Footer />
      </div>
    </Box>
  );
};

export default LayoutPage;
