import React, { useEffect } from 'react';
import {
  userSelector,
  fetchUserBytoken,
} from '../../../../features/User/UserSlice';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import TopNavHoverMenus from './TopNavHoverMenus';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';
import LibraryBooksRoundedIcon from '@material-ui/icons/LibraryBooksRounded';
import CheckBoxRoundedIcon from '@material-ui/icons/CheckBoxRounded';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import BusinessOutlinedIcon from '@material-ui/icons/BusinessOutlined';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
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

  const { user } = useSelector(userSelector);

  const userList = {
    text: user?.name,
    path: '',
    icon: <ArrowDropDownIcon />,
    subMenu: [
      {
        text: 'Tài khoản',
        path: '/dashboard/info',
        icon: <PersonRoundedIcon />,
      },
      {
        text: 'Quản lý cv',
        path: '/dashboard/cv',
        icon: <LibraryBooksRoundedIcon />,
      },
      {
        text: 'Đã ứng tuyển',
        path: '/dashboard/apply',
        icon: <CheckBoxRoundedIcon />,
      },
      {
        text: 'Tìm việc',
        path: '/find',
        icon: <SearchOutlinedIcon />,
      },
      {
        text: 'Đăng xuất',
        path: '/logout',
        icon: <ExitToAppOutlinedIcon />,
      },
      {
        text: 'Đăng ký tuyển dụng',
        path: '/register-company',
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
