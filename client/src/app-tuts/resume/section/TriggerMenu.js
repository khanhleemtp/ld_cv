import * as React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {
  usePopupState,
  bindTrigger,
  bindMenu,
} from 'material-ui-popup-state/hooks';
import MuiSwitch from '../input/MuiSwitch';

const TriggerMenu = ({ component, listItem, control }) => {
  const popupState = usePopupState({ variant: 'popover', popupId: 'demoMenu' });
  return (
    <div>
      <div
        {...bindTrigger(popupState)}
        style={{
          alignSelf: 'center',
        }}
      >
        {component}
      </div>
      <Menu
        disableScrollLock={true}
        {...bindMenu(popupState)}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      >
        {listItem.map((item, index) => (
          <MenuItem key={index}>
            <MuiSwitch
              control={control}
              nameField={item.nameField}
              label={item.label}
            />
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default TriggerMenu;
