import React, { useEffect } from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import FullScreenDialog from './FullScreenDialog';
import useNavbar from './useNavbar';
import { useSelector, useDispatch } from 'react-redux';
import {
  userSelector,
  fetchUserBytoken,
  clearState,
} from '../../../../features/User/UserSlice';
import Avatar from '@material-ui/core/Avatar';
import Container from '@material-ui/core/Container';
import CascadingHoverMenus from './CascadingHoverMenus';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';
import LibraryBooksRoundedIcon from '@material-ui/icons/LibraryBooksRounded';
import FaceRoundedIcon from '@material-ui/icons/FaceRounded';
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';
import CheckBoxRoundedIcon from '@material-ui/icons/CheckBoxRounded';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import BusinessOutlinedIcon from '@material-ui/icons/BusinessOutlined';
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
  avatar: {
    marginRight: theme.spacing(1),
  },
  boxAvatar: {
    display: 'flex',
    alignItems: 'center',
  },
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
    flex: '1 1 0',
  },
  list: {
    // width: '100%',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
    display: 'flex',
    flex: '1 1 0',
  },
  listItem: {
    cursor: 'pointer',
    padding: 0,
    marginLeft: 24,
    maxWidth: 160,

    // width: '100%',
    userSelect: 'none',
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
  user: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
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
    token,
    changeNav,
    location,
    handleClickItem,
    handleClickOpenDialog,
    handleClickCloseDialog,
    openDialog,
    listLink,
  } = useNavbar();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearState());
  }, [dispatch]);

  // useEffect(() => {
  //   const promise = dispatch(fetchUserBytoken());

  //   return () => {
  //     console.log('Abort unmount');
  //     promise.abort();
  //   };
  // }, [dispatch]);

  const classes = useStyles();
  const { user } = useSelector(userSelector);
  const userList = {
    text: user?.name,
    path: '',
    icon: <ArrowDropDownIcon />,
    subMenu: [
      {
        text: 'Tài khoản',
        path: '/dashboard',
        icon: <PersonRoundedIcon />,
        onClick: goToPage('/dashboard'),
      },
      {
        text: 'Quản lý cv',
        path: '/resume',
        icon: <LibraryBooksRoundedIcon />,
        onClick: goToPage('/resume'),
      },
      {
        text: 'Thông báo việc làm',
        path: '/reviews',
        icon: <FaceRoundedIcon />,
        onClick: goToPage('/reviews'),
      },
      {
        text: 'Đã lưu',
        path: '/save',
        icon: <FavoriteRoundedIcon />,
        onClick: goToPage('/save'),
      },
      {
        text: 'Đã ứng tuyển',
        path: '/apply',
        icon: <CheckBoxRoundedIcon />,
        onClick: goToPage('/apply'),
      },
      {
        text: 'Đăng xuất',
        path: '/',
        icon: <ExitToAppOutlinedIcon />,
        onClick: goToPage('/logout'),
      },
      {
        text: 'Trở thành nhà tuyển dụng',
        path: '/',
        icon: <BusinessOutlinedIcon />,
        onClick: goToPage('/register-company'),
      },
    ],
  };

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
        <Container maxWidth="lg">
          <Box className={classes.boxGrow}>
            <Typography
              variant="h6"
              className={classes.title}
              onClick={goToPage('/')}
            >
              LD ☕
            </Typography>
            <Box className={classes.list}>
              {menuItem?.map((item, i) => (
                <CascadingHoverMenus item={item} key={item.text} />
              ))}
            </Box>

            <Box display="flex" alignItems="center" className={classes.user}>
              {token ? (
                <Box className={classes.boxAvatar}>
                  <CascadingHoverMenus item={userList} />
                  <Avatar>{String(user.name).charAt(0).toUpperCase()}</Avatar>
                </Box>
              ) : (
                <>
                  <Button
                    className={classes.btn}
                    variant="contained"
                    color="inherit"
                    onClick={goToPage('/signup')}
                  >
                    Đăng ký
                  </Button>
                  <Button
                    className={classes.btn}
                    variant="contained"
                    color="inherit"
                    onClick={goToPage('/signin')}
                  >
                    Đăng nhập
                  </Button>
                  <Button
                    className={classes.btn}
                    variant="contained"
                    color="inherit"
                    onClick={goToPage('/signin')}
                  >
                    Doanh nghiệp
                  </Button>
                </>
              )}
            </Box>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="flex-end"
              flexGrow={1}
              className={classes.menuButton}
            >
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={handleClickOpenDialog}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          </Box>
        </Container>
        <FullScreenDialog
          handleClickOpen={handleClickOpenDialog}
          handleClose={handleClickCloseDialog}
          openDialog={openDialog}
          handleClickItem={handleClickItem}
          listLink={listLink}
        />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
