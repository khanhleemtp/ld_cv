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
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';

import { Link } from 'react-router-dom';
import { userSelector } from '../../../../features/User/UserSlice';
import { useSelector } from 'react-redux';

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
  link: {
    textDecoration: 'none',
    color: theme.palette.primary.orange,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

const TopNavMobile = ({ handleClose, open, navOptions }) => {
  const classes = useStyles();

  const { user } = useSelector(userSelector);

  return (
    <div>
      <Dialog
        fullScreen
        disableScrollLock={true}
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
          {navOptions.map((link) => (
            <Link
              key={link.title}
              to={link.path}
              className={classes.link}
              onClick={handleClose}
            >
              <ListItem button>
                <ListItemText primary={link.title} />
              </ListItem>
              <Divider />
            </Link>
          ))}
        </List>
      </Dialog>
    </div>
  );
};

export default TopNavMobile;
