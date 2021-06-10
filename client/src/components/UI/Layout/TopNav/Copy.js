import { useDispatch } from 'react-redux';
import { Link, useHistory, useLocation, withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { logOut } from '../../../../features/User/UserSlice';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { useState, useEffect, useCallback } from 'react';

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

function TopNav(props) {
  let history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logOut());
    history.push('/');
  };
  const handleGoHome = () => {
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
  console.log('history', history.location);

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
          <Box className={classes.boxGrow} onClick={handleGoHome}>
            <Typography
              variant="h6"
              className={classes.logo}
              onClick={() => {
                history.replace('/signin');
              }}
            >
              LD ☕
            </Typography>
            {/* <Box className={classes.list}>
              {props.routes.map(({ path, title }) => {
                return (
                  <Link
                    key={title}
                    to={`${props?.prefix}${path}`}
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
            </Box> */}
            {props.routes.map(({ path, title }) => (
              <Link
                key={path}
                className="w3-bar-item"
                to={`${props.prefix}${path}`}
              >
                {title}
              </Link>
            ))}
            {<Button onClick={handleLogout}>Logout</Button>}
          </Box>
        </Container>
      </Toolbar>
    </AppBar>
  );
}
export default withRouter(TopNav);
