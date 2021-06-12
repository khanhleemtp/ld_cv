import React, { useEffect } from 'react';
import {
  userSelector,
  fetchUserBytoken,
  getNotifications,
} from '../../../../features/User/UserSlice';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import TopNavHoverMenus from './TopNavHoverMenus';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';
import LibraryBooksRoundedIcon from '@material-ui/icons/LibraryBooksRounded';
import FaceRoundedIcon from '@material-ui/icons/FaceRounded';
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';
import CheckBoxRoundedIcon from '@material-ui/icons/CheckBoxRounded';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import BusinessOutlinedIcon from '@material-ui/icons/BusinessOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  avatar: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
}));

const TopNavAvatar = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  useEffect(() => {
    dispatch(fetchUserBytoken());
  }, [dispatch]);

  const { user, isFetching } = useSelector(userSelector);

  useEffect(() => {
    const id = !isFetching && user?._id;
    dispatch(getNotifications(id));
  }, [dispatch, isFetching, user]);

  const userList = {
    text: user?.name,
    path: '',
    icon: <ArrowDropDownIcon />,
    subMenu: [
      {
        text: 'Tài khoản',
        path: '/dashboard',
        icon: <PersonRoundedIcon />,
      },
      {
        text: 'Quản lý cv',
        path: '/resume',
        icon: <LibraryBooksRoundedIcon />,
      },
      // {
      //   text: 'Thông báo việc làm',
      //   path: '/reviews',
      //   icon: <FaceRoundedIcon />,
      // },
      // {
      //   text: 'Đã lưu',
      //   path: '/save',
      //   icon: <FavoriteRoundedIcon />,
      // },
      {
        text: 'Đã ứng tuyển',
        path: '/apply',
        icon: <CheckBoxRoundedIcon />,
      },
      {
        text: 'Đăng xuất',
        path: '/',
        icon: <ExitToAppOutlinedIcon />,
      },
      {
        text: 'Đăng ký tuyển dụng',
        path: '/',
        icon: <BusinessOutlinedIcon />,
      },
    ],
  };
  return (
    <Box display="flex" alignItems="center" className={classes.avatar}>
      <Avatar>{String(user.name).charAt(0).toUpperCase()}</Avatar>
      <TopNavHoverMenus menu={userList} />
    </Box>
  );
};

export default TopNavAvatar;
