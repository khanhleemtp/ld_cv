import { useState, useEffect, useCallback } from 'react';
import { useHistory, useLocation } from 'react-router';
import { useDispatch } from 'react-redux';
import { logOut } from '../../../../features/User/UserSlice';
import { TokenService } from '../../../../services/TokenService';
import { getNavbarData } from './data';

const listLink = [
  {
    text: 'Việc làm IT',
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
  const [navData, setNavData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setNavData(await getNavbarData());
    };
    fetchData();
  }, []);

  const menuItem = [
    {
      text: 'Việc làm IT',
      path: '/',
      subMenu: [
        {
          text: 'Việc làm IT theo kỹ năng',
          path: '/',
          menus: navData?.tech || [],
        },
        {
          text: 'Việc làm IT theo công ty',
          path: '/',
          menus: navData?.company || [],
        },
        {
          text: 'Việc làm IT theo cấp bậc',
          path: '/',
          menus: navData?.position || [],
        },
        {
          text: 'Việc làm IT theo thành phố',
          path: '/',
          menus: ['Hà Nội', 'Hồ Chí Minh', 'Đà Nẵng', 'Khác'],
        },
      ],
    },
    {
      text: 'Công ty IT hàng đầu',
      path: '/',
      subMenu: [
        {
          text: 'Công ty tốt nhất',
          path: '/',
        },
        {
          text: 'Đánh giá công ty',
          path: '/reviews',
        },
      ],
    },
    {
      text: 'Quản lý cv',
      path: '/resumes',
    },
  ];

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
        dispatch(logOut());
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
