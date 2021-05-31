import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from 'material-ui-popup-state/HoverMenu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';

import {
  usePopupState,
  bindHover,
  bindMenu,
} from 'material-ui-popup-state/hooks';

const useStyles = makeStyles((theme) => ({
  box: {
    display: 'flex',
    alignItems: 'center',
  },
  menu: {},
}));

const MenuLink = ({ icon, text, listItems, className }) => {
  const classes = useStyles();

  const popupState = usePopupState({ variant: 'popover', popupId: 'demoMenu' });
  return (
    <React.Fragment>
      <ListItem {...bindHover(popupState)} className={className}>
        <ListItemText primary={text} />
        <ListItemIcon>{icon}</ListItemIcon>
      </ListItem>
      <Menu
        disableScrollLock={true}
        {...bindMenu(popupState)}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        className={classes.menu}
      >
        {listItems?.map((item) => (
          <MenuItem key={item.text} onClick={popupState.close}>
            {item.text}
          </MenuItem>
        ))}
      </Menu>
    </React.Fragment>
  );
};

export default MenuLink;
