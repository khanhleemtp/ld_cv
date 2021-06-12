import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import MailIcon from '@material-ui/icons/Mail';
import { useSelector } from 'react-redux';
import { userSelector } from '../../../../features/User/UserSlice';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      cursor: 'pointer',
    },
  },
}));

const TopNavBadge = () => {
  const classes = useStyles();
  const { notifications } = useSelector(userSelector);
  return (
    <PopupState variant="popover" popupId="demo-popup-popover">
      {(popupState) => (
        <div>
          <div className={classes.root} {...bindTrigger(popupState)}>
            <Badge badgeContent={notifications?.length || 0} color="primary">
              <MailIcon />
            </Badge>
          </div>
          <Popover
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            {notifications?.length > 0 ? (
              <Box p={2}>
                {notifications?.map((noti) => (
                  <Typography variant="caption" key={noti?.message}>
                    {noti?.message}
                  </Typography>
                ))}
              </Box>
            ) : null}
          </Popover>
        </div>
      )}
    </PopupState>
  );
};
export default TopNavBadge;
