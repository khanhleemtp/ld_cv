import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { clearState, userSelector } from '../features/User/UserSlice';
import { Avatar, Box } from '@material-ui/core';
import { TokenService } from '../services/TokenService';

const listLink = [
  {
    title: 'Home',
    path: '/',
    sub: 'Go home',
  },
  {
    title: 'Dashboard',
    path: '/dashboard',
    sub: 'Go me',
  },
  {
    title: 'Logout',
    path: '/',
    sub: '😆',
  },
  {
    title: 'Resume',
    path: '/resume',
    sub: '😋',
  },
];

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  avatar: {
    marginRight: theme.spacing(1),
  },
  boxAvatar: {
    display: 'flex',
    alignItems: 'center',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

export default function FullScreenDialog({ handleClose, openDialog: open }) {
  const classes = useStyles();
  const history = useHistory();

  const { user } = useSelector(userSelector);
  const dispatch = useDispatch();

  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              LD CV
            </Typography>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <List>
          <ListItem>
            {user && (
              <Box className={classes.boxAvatar}>
                <Avatar className={classes.avatar}>
                  {String(user.name).charAt(0).toUpperCase()}
                </Avatar>
                <Typography>{user.name}</Typography>
              </Box>
            )}
          </ListItem>
          <Divider />
          {listLink.map((link) => (
            <div
              key={link.title}
              onClick={() => {
                if (link.title === 'Logout') {
                  dispatch(clearState());
                  TokenService.removeToken();
                }
                history.push(link.path);
                handleClose();
              }}
            >
              <ListItem button>
                <ListItemText primary={link.title} secondary={link.sub} />
              </ListItem>
              <Divider />
            </div>
          ))}
        </List>
      </Dialog>
    </div>
  );
}
