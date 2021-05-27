import React, { useState, useEffect, useCallback } from 'react';
import { useHistory, useLocation } from 'react-router';
import { useDispatch } from 'react-redux';
import ExpandMoreOutlinedIcon from '@material-ui/icons/ExpandMoreOutlined';
import { clearState } from '../../../../features/User/UserSlice';
import { TokenService } from '../../../../services/TokenService';

const menuItem = [
  {
    text: 'Home',
    icon: <ExpandMoreOutlinedIcon color="secondary" />,
    path: '/',
    list: [
      {
        text: 'Home',
        path: '/home',
      },
      {
        text: 'Home 1',
        path: '/home',
      },
      {
        text: 'Home 2',
        path: '/home 3',
      },
      {
        text: 'Home 4',
        path: '/home',
      },
    ],
  },
  {
    text: 'Dashboard',
    path: '/dashboard',
    icon: <ExpandMoreOutlinedIcon color="secondary" />,
    isLoggin: true,
  },
  {
    text: 'DragPage',
    path: '/drag',
    icon: <ExpandMoreOutlinedIcon color="secondary" />,
    isLoggin: true,
  },
  {
    text: 'Resume',
    path: '/resume',
    icon: <ExpandMoreOutlinedIcon color="secondary" />,
    isLoggin: true,
  },
  {
    text: 'Signup',
    icon: <ExpandMoreOutlinedIcon color="secondary" />,
    path: '/signup',
    isLoggin: false,
  },
  {
    text: 'Signin',
    icon: <ExpandMoreOutlinedIcon color="secondary" />,
    path: '/signin',
    isLoggin: false,
  },
  {
    text: 'Logout',
    icon: <ExpandMoreOutlinedIcon color="secondary" />,
    path: '/',
    isLoggin: true,
  },
];

const listLink = [
  {
    text: 'Home',
    path: '/',
    sub: 'Go home',
  },
  {
    text: 'Dashboard',
    path: '/dashboard',
    sub: 'Go me',
  },
  {
    text: 'Logout',
    path: '/',
    sub: '😆',
  },
  {
    text: 'Resume',
    path: '/resume',
    sub: '😋',
  },
];

const useNavbar = () => {
  const token = TokenService.getToken();
  const history = useHistory();
  const location = useLocation();
  const [openDialog, setOpenDialog] = useState(false);
  const [changeNav, setChangeNav] = useState(false);

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleClickCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleChangeBgNav = useCallback(() => {
    if (window.scrollY >= 56) {
      setChangeNav(true);
    } else setChangeNav(false);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleChangeBgNav);
    return () => {
      window.removeEventListener('scroll', handleChangeBgNav);
    };
  }, [handleChangeBgNav]);

  const dispatch = useDispatch();

  const goToPage = (page) => {
    return () => {
      history.push(page);
    };
  };

  const handleClickItem = (item) => {
    return () => {
      if (item.text === 'Logout') {
        TokenService.removeToken();
        dispatch(clearState());
      }
      handleClickCloseDialog();
      history.push(item.path);
    };
  };

  return {
    goToPage,
    menuItem,
    changeNav,
    location,
    token,
    handleClickItem,
    handleClickOpenDialog,
    handleClickCloseDialog,
    openDialog,
    listLink,
  };
};

export default useNavbar;
