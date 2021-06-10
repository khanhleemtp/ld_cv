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
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import { useSelector } from 'react-redux';
import { userSelector } from '../../../../features/User/UserSlice';

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

export default function FullScreenDialog({
  handleClose,
  openDialog: open,
  handleClickItem,
  listLink,
}) {
  const classes = useStyles();
  // const { user } = useSelector(userSelector);
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
            {/* {user && (
              <Box className={classes.boxAvatar}>
                <Avatar className={classes.avatar}>
                  {String(user.name).charAt(0).toUpperCase()}
                </Avatar>
                <Typography>{user.name}</Typography>
              </Box>
            )} */}
          </ListItem>
          <Divider />
          {listLink.map((link) => (
            <div key={link.text} onClick={handleClickItem(link)}>
              <ListItem button>
                <ListItemText primary={link.text} secondary={link.sub} />
              </ListItem>
              <Divider />
            </div>
          ))}
        </List>
      </Dialog>
    </div>
  );
}
