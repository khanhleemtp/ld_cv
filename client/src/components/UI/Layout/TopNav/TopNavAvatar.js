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
import FaceRoundedIcon from '@material-ui/icons/FaceRounded';
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';
import CheckBoxRoundedIcon from '@material-ui/icons/CheckBoxRounded';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import BusinessOutlinedIcon from '@material-ui/icons/BusinessOutlined';

import { useDispatch, useSelector } from 'react-redux';

const TopNavAvatar = () => {
  const dispatch = useDispatch();

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
        path: '/dashboard',
        icon: <PersonRoundedIcon />,
      },
      {
        text: 'Quản lý cv',
        path: '/resume',
        icon: <LibraryBooksRoundedIcon />,
      },
      {
        text: 'Thông báo việc làm',
        path: '/reviews',
        icon: <FaceRoundedIcon />,
      },
      {
        text: 'Đã lưu',
        path: '/save',
        icon: <FavoriteRoundedIcon />,
      },
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
        text: 'Trở thành nhà tuyển dụng',
        path: '/',
        icon: <BusinessOutlinedIcon />,
      },
    ],
  };

  return (
    <Box display="flex" alignItems="center">
      <TopNavHoverMenus menu={userList} />
      <Avatar>{String(user.name).charAt(0).toUpperCase()}</Avatar>
    </Box>
  );
};

export default TopNavAvatar;
