import * as React from 'react';
import Menu from 'material-ui-popup-state/HoverMenu';
import MenuItem from '@material-ui/core/MenuItem';
import {
  usePopupState,
  bindHover,
  bindMenu,
} from 'material-ui-popup-state/hooks';
import { makeStyles } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  linkItem: {
    cursor: 'pointer',
    textAlign: 'center',
    userSelect: 'none',
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
}));

const TopNavHoverMenus = ({ menu }) => {
  const popupState = usePopupState({ variant: 'popover', popupId: 'demoMenu' });
  const history = useHistory();
  const classes = useStyles();
  return (
    <React.Fragment>
      <Box
        {...bindHover(popupState)}
        className={classes.linkItem}
        display="flex"
        alignItems="center"
        marginX={1}
        style={{ fontSize: 14 }}
      >
        {menu.text}
        {menu?.icon && menu.icon}
      </Box>
      <Menu
        {...bindMenu(popupState)}
        getContentAnchorEl={null}
        disableScrollLock={true}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      >
        {menu?.subMenu.map((item) => (
          <MenuItem
            key={item.text}
            onClick={() => {
              history.push(item.path);
              popupState.close();
            }}
          >
            {item?.icon} <span style={{ marign: 4, width: 8 }}></span>
            {item?.text}
          </MenuItem>
        ))}
      </Menu>
    </React.Fragment>
  );
};

export default TopNavHoverMenus;
