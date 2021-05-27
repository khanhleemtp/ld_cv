import React from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import useNavbar from './useNavbar';
import FullScreenDialog from './FullScreenDialog';
import MenuLink from './MenuLink';

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

const Navbar = () => {
  const {
    goToPage,
    menuItem,
    changeNav,
    location,
    token,
    handleClickItem,
    handleClickOpenDialog,
    handleClickCloseDialog,
    openDialog,
    listLink,
  } = useNavbar();
  const classes = useStyles();
  return (
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
            onClick={goToPage('/')}
          >
            LD 🥶
          </Typography>

          <List className={classes.list}>
            {menuItem.map((item) => {
              if (item?.list) {
                return (
                  <MenuLink
                    key={item.text}
                    text={item.text}
                    listItems={item.list}
                    icon={item.icon}
                    className={classes.listItem}
                  />
                );
              }
              if (token) {
                return (
                  <ListItem
                    key={item.text}
                    className={
                      item.isLoggin ? classes.listItem : classes.isHidden
                    }
                    onClick={handleClickItem(item)}
                  >
                    <ListItemText primary={item.text} />
                    <ListItemIcon>{item.icon}</ListItemIcon>
                  </ListItem>
                );
              }
              return (
                <ListItem
                  key={item.text}
                  className={
                    !item.isLoggin ? classes.listItem : classes.isHidden
                  }
                  onClick={goToPage(item.path)}
                >
                  <ListItemText primary={item.text} />
                  <ListItemIcon>{item.icon}</ListItemIcon>
                </ListItem>
              );
            })}
          </List>
        </Box>

        {token ? (
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={handleClickOpenDialog}
          >
            <MenuIcon />
          </IconButton>
        ) : (
          <>
            <Button
              className={classes.btn}
              variant="contained"
              color="inherit"
              onClick={goToPage('/signup')}
            >
              Sign up
            </Button>
            <Button
              className={classes.btn}
              variant="contained"
              color="inherit"
              onClick={goToPage('/signin')}
            >
              Sign in
            </Button>
          </>
        )}
      </Toolbar>
      <FullScreenDialog
        handleClickOpen={handleClickOpenDialog}
        handleClose={handleClickCloseDialog}
        openDialog={openDialog}
        handleClickItem={handleClickItem}
        listLink={listLink}
      />
    </AppBar>
  );
};

export default Navbar;
