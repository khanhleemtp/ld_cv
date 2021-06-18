import { makeStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import NotificationsNoneOutlinedIcon from '@material-ui/icons/NotificationsNoneOutlined';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteNotification,
  getNotifications,
  userSelector,
} from '../../../../features/User/UserSlice';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Popover from '@material-ui/core/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import ClearOutlinedIcon from '@material-ui/icons/ClearOutlined';
import { useEffect } from 'react';
import { Divider } from '@material-ui/core';
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
    '&:hover': {
      background: theme.palette.grey[100],
    },
    margin: 2,
  },
  icon: {
    textAlign: 'center',
    cursor: 'pointer',
    paddingTop: 4,
    color: theme.palette.primary.main,
  },
}));

const TopNavBadge = () => {
  const classes = useStyles();
  const { user } = useSelector(userSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    const id = user?._id;
    dispatch(getNotifications(id));
  }, [dispatch, user]);

  const { notifications } = useSelector(userSelector);

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
                style={{
                  maxHeight: 120,
                  maxWidth: 240,
                  padding: 1,
                }}
              >
                {notifications?.map((noti, index) => (
                  <Box key={index} className={classes.text}>
                    <Box display="flex" padding={1}>
                      {noti?.message}{' '}
                      <ClearOutlinedIcon
                        titleAccess="Xóa thông báo"
                        className={classes.icon}
                        fontSize="small"
                        onClick={handleDeleteNotification(noti?._id)}
                      />
                    </Box>
                    <Divider />
                  </Box>
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
