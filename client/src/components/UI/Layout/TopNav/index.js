import { Link, useHistory, useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import LinkItemText from '@material-ui/core/ListItemText';

import { useState, useEffect, useCallback } from 'react';
import TopNavAvatar from './TopNavAvatar';
import { TokenService } from '../../../../services/TokenService';
import { userSelector } from '../../../../features/User/UserSlice';
import { useSelector } from 'react-redux';
import TopNavBadge from './TopNavBadge';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import TopNavMobile from './TopNavMobile';

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

function TopNav() {
  let history = useHistory();
  const location = useLocation();
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  const handleGoHome = () => {
    history.push('/');
  };

  // const handleLink = (path) => () => history.replace({ pathname: path });

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
  const { user } = useSelector(userSelector);

  const guestOptions = [
    { title: 'Đăng nhập', path: '/signin' },
    { title: 'Đăng ký', path: '/signup' },
    { title: 'Việc làm IT', path: '/find' },
  ];

  const userOptions = [
    { title: 'Việc làm IT', path: '/find' },
    { title: 'Đăng ký công ty', path: '/register-company' },
    { title: 'Tạo CV', path: '/dashboard/cv' },
    { title: 'Thông tin', path: '/dashboard/info' },
    { title: 'Đăng xuất', path: '/logout' },
  ];

  const companyOptions = [
    { title: 'Cập nhật công ty', path: '/manager-company/update-company' },
    { title: 'Tạo việc làm', path: '/manager-company/create-job' },
    { title: 'Danh sách việc làm', path: '/manager-company/list-job' },
    { title: 'Company Page', path: `/company/${user?.company?._id}` },
  ];

  const adminOptions = [
    { title: 'Duyệt công ty', path: '/admin/response-company' },
    { title: 'Quản lý công ty', path: '/admin/list-company' },
  ];

  let navOptions = !TokenService.getToken()
    ? guestOptions
    : user?.role === 'admin'
    ? adminOptions
    : user?.role === 'company'
    ? companyOptions
    : user?.role === 'user'
    ? userOptions
    : guestOptions;

  console.log(user?.role);
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
              {TokenService.getToken() && <TopNavBadge />}
              {TokenService.getToken() && <TopNavAvatar />}
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                className={classes.menu}
                onClick={handleOpenDialog}
              >
                <MenuIcon />
              </IconButton>
              <TopNavMobile
                open={openDialog}
                handleClose={handleCloseDialog}
                navOptions={navOptions}
                // handleLink={handleLink}
              />
            </Box>
          </Box>
        </Container>
      </Toolbar>
    </AppBar>
  );
}
export default TopNav;
