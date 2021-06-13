import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import NotificationsNoneOutlinedIcon from '@material-ui/icons/NotificationsNoneOutlined';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteNotification,
  userSelector,
} from '../../../../features/User/UserSlice';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Popover from '@material-ui/core/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import ClearOutlinedIcon from '@material-ui/icons/ClearOutlined';
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      cursor: 'pointer',
      marginRight: theme.spacing(1.6),
      marginLeft: theme.spacing(1.6),
    },
  },
  text: {
    padding: 4,
  },
  icon: {
    textAlign: 'center',
    cursor: 'pointer',
    paddingTop: 4,
  },
}));

const TopNavBadge = () => {
  const classes = useStyles();
  const { notifications } = useSelector(userSelector);
  const dispatch = useDispatch();
  const handleDeleteNotification = (id) => () =>
    dispatch(deleteNotification(id));

  return (
    <PopupState variant="popover" popupId="demo-popup-popover">
      {(popupState) => (
        <div>
          <div className={classes.root} {...bindTrigger(popupState)}>
            <Badge badgeContent={notifications?.length || 0} color="primary">
              <NotificationsNoneOutlinedIcon />
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
            disableScrollLock={true}
          >
            {notifications?.length > 0 ? (
              <Box
                p={2}
                style={{
                  maxHeight: 120,
                  maxWidth: 240,
                }}
              >
                {notifications?.map((noti) => (
                  <Typography
                    variant="caption"
                    key={noti?.message}
                    className={classes.text}
                  >
                    {noti?.message}{' '}
                    <ClearOutlinedIcon
                      className={classes.icon}
                      fontSize="small"
                      onClick={handleDeleteNotification(noti?._id)}
                    />
                  </Typography>
                ))}
              </Box>
            ) : (
              <Box className={classes.text}>
                <Typography variant="caption">
                  Bạn không có thông báo nào
                </Typography>
              </Box>
            )}
          </Popover>
        </div>
      )}
    </PopupState>
  );
};
export default TopNavBadge;
