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

const listLink = [
  {
    title: 'Home',
    path: '/',
    sub: 'Go home',
  },
  {
    title: 'Test',
    path: '/test',
    sub: 'Go test',
  },
  {
    title: 'Register',
    path: '/register',
    sub: 'Go Register',
  },
  {
    title: 'Signup',
    path: '/',
    sub: 'Go signup',
  },
];

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
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
          {listLink.map((link) => (
            <div
              key={link.title}
              onClick={() => {
                history.push(link.title);
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
