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
import { Button } from '@material-ui/core';
import { logOut } from '../../../../features/User/UserSlice';
import { useDispatch } from 'react-redux';
import TopNavBadge from './TopNavBadge';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    overflow: 'hidden',
  },

  toolbar: theme.mixins.toolbar,
  avatar: {
    marginRight: theme.spacing(1),
  },
  boxAvatar: {
    display: 'flex',
    alignItems: 'center',
  },
  logo: {
    marginRight: theme.spacing(4),
    color: theme.palette.primary.main,
    fontSize: 28,
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
      background: theme.palette.primary.header,
    },
    marginRight: theme.spacing(1),
  },
  linkItem: {
    fontSize: theme.spacing(2.2),
    color: theme.palette.grey[700],
    textAlign: 'center',
    userSelect: 'none',
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
}));

const navOptions = [
  { title: 'Đăng nhập', path: '/signin' },
  { title: 'Đăng ký', path: '/signup' },
  { title: 'Việc làm IT', path: '/job' },
  { title: 'Tôi', path: '/dashboard' },
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
            <Box className={classes.list}>
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
            <TopNavBadge />
            {TokenService.getToken() && <TopNavAvatar />}
            {TokenService.getToken() && (
              <Button variant="outlined" onClick={handleLogOut}>
                LogOut
              </Button>
            )}
          </Box>
        </Container>
      </Toolbar>
    </AppBar>
  );
}
export default TopNav;
