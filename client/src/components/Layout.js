import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ExpandMoreOutlinedIcon from '@material-ui/icons/ExpandMoreOutlined';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { useHistory, useLocation } from 'react-router';
import MenuLink from './MenuLink';
import FullScreenDialog from './FullScreenDialog';
import CopyRight from './CopyRight';

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
  },
  menuButton: {
    marginLeft: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
    },
    display: 'none',
  },
}));

const menuItem = [
  {
    text: 'Home',
    icon: <ExpandMoreOutlinedIcon color="secondary" />,
    path: '/',
    list: [
      {
        text: 'Home',
        path: '/home',
      },
      {
        text: 'Home 1',
        path: '/home',
      },
      {
        text: 'Home 2',
        path: '/home 3',
      },
      {
        text: 'Home 4',
        path: '/home',
      },
    ],
  },
  {
    text: 'Test',
    path: '/test',
    icon: <ExpandMoreOutlinedIcon color="secondary" />,
  },
  {
    text: 'Signup',
    icon: <ExpandMoreOutlinedIcon color="secondary" />,
    path: '/signup',
  },
  {
    text: 'Me',
    icon: <ExpandMoreOutlinedIcon color="secondary" />,
    path: '/me',
  },
];

const Layout = ({ children }) => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  console.log(location.pathname);

  const [openDialog, setOpenDialog] = useState(false);
  const [changeNav, setChangeNav] = useState(false);

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleChangeBgNav = () => {
    if (window.scrollY >= 56) {
      setChangeNav(true);
    } else setChangeNav(false);
  };

  window.addEventListener('scroll', handleChangeBgNav);

  return (
    <Box className={classes.root}>
      {/* Nav */}

      <AppBar
        position="fixed"
        className={
          changeNav || location.pathname !== '/'
            ? classes.nav
            : classes.navNotActive
        }
      >
        <Toolbar>
          <Box className={classes.boxGrow}>
            <Typography
              variant="h6"
              className={classes.title}
              onClick={() => {
                history.push('/');
              }}
            >
              LD 🥶
            </Typography>

            <List className={classes.list}>
              {menuItem.map((item) =>
                item?.list ? (
                  <MenuLink
                    key={item.text}
                    text={item.text}
                    listItems={item.list}
                    icon={item.icon}
                    className={classes.listItem}
                  />
                ) : (
                  <ListItem
                    key={item.text}
                    className={classes.listItem}
                    onClick={() => {
                      console.log('Click');
                      history.push(item.path);
                    }}
                  >
                    <ListItemText primary={item.text} />
                    <ListItemIcon>{item.icon}</ListItemIcon>
                  </ListItem>
                )
              )}
            </List>
          </Box>

          <Button
            className={classes.btn}
            variant="contained"
            color="inherit"
            onClick={() => history.push('/signup')}
          >
            Sign up
          </Button>

          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={handleClickOpenDialog}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <FullScreenDialog
        handleClickOpen={handleClickOpenDialog}
        handleClose={handleCloseDialog}
        openDialog={openDialog}
      />
      <div className={classes.page}>
        <div className={classes.toolbar}></div>

        {children}
        <CopyRight />
      </div>
    </Box>
  );
};

export default Layout;
