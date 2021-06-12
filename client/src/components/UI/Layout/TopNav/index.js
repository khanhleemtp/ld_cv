import { Link, useHistory, useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { useState, useEffect, useCallback } from 'react';
import TopNavAvatar from './TopNavAvatar';
import { TokenService } from '../../../../services/TokenService';
import { logOut } from '../../../../features/User/UserSlice';
import { useDispatch } from 'react-redux';
import TopNavBadge from './TopNavBadge';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    overflow: 'hidden',
  },
  menu: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  logo: {
    marginRight: theme.spacing(4),
    color: theme.palette.primary.main,
    fontSize: 24,
    cursor: 'pointer',
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
  isHidden: {
    display: 'none',
  },
  boxGrow: {
    display: 'flex',
    alignItems: 'center',
    flexGrow: 1,
  },
  linkList: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },

  linkItem: {
    fontSize: theme.spacing(1.8),
    color: theme.palette.grey[700],
    textAlign: 'center',
    userSelect: 'none',
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
}));

const guestOptions = [
  { title: 'Đăng nhập', path: '/signin' },
  { title: 'Đăng ký', path: '/signup' },
  { title: 'Việc làm IT', path: '/job' },
];

const userOptions = [
  { title: 'Tìm việc', path: '/signin' },
  { title: 'Tạo CV', path: '/signup' },
  { title: 'Công ty', path: '/signup' },
];

const companyOptions = [
  { title: 'Quản lý', path: '/manager' },
  { title: 'Compant Page', path: '/company' },
  { title: 'Việc làm IT', path: '/job' },
];

const adminOptions = [
  { title: 'Đăng nhập', path: '/signin' },
  { title: 'Đăng ký', path: '/signup' },
  { title: 'Việc làm IT', path: '/job' },
];

const navOptions = [
  // { title: 'Đăng nhập', path: '/signin' },
  // { title: 'Đăng ký', path: '/signup' },
  // { title: 'Việc làm IT', path: '/job' },
  { title: 'Thông tin', path: '/dashboard' },
  { title: 'Công ty', path: '/manager' },
  { title: 'Admin', path: '/admin' },
  { title: 'Đăng ký công ty', path: '/register-company' },
  { title: 'Tìm việc', path: '/find' },
];

function TopNav() {
  let history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const handleGoHome = () => {
    history.push('/');
  };

  const handleLogOut = () => {
    dispatch(logOut());
    history.push('/');
  };

  const handleChangeBgNav = useCallback(() => {
    if (window.scrollY >= 56) {
      setChangeNav(true);
    } else setChangeNav(false);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleChangeBgNav);
    return () => {
      window.removeEventListener('scroll', handleChangeBgNav);
    };
  }, [handleChangeBgNav]);

  const [changeNav, setChangeNav] = useState(false);

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
        <Container maxWidth="lg">
          <Box className={classes.boxGrow}>
            <Typography
              variant="h6"
              className={classes.logo}
              onClick={handleGoHome}
            >
              LD ☕
            </Typography>
            <Box className={classes.linkList}>
              {navOptions.map(({ path, title }) => {
                return (
                  <Link
                    key={title}
                    to={`${path}`}
                    style={{
                      textDecoration: 'none',
                    }}
                  >
                    <Box
                      className={classes.linkItem}
                      display="flex"
                      alignItems="center"
                      marginX={1}
                    >
                      {title}
                    </Box>
                  </Link>
                );
              })}
            </Box>
            <Box
              flexGrow={1}
              alignItems="center"
              display="flex"
              justifyContent="flex-end"
            >
              <TopNavBadge />
              {TokenService.getToken() && <TopNavAvatar />}
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                className={classes.menu}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          </Box>
        </Container>
      </Toolbar>
    </AppBar>
  );
}
export default TopNav;
