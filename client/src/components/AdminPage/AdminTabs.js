import React from 'react';
import Box from '@material-ui/core/Box';
import TabComponent from '../UI/TabComponent';
import AdminCompanyList from './AdminCompanyList';
import AdminCompanyAccept from './AdminCompanyAccept';
const AdminTabs = () => {
  const tabList = [
    {
      label: 'Duyệt công ty',
      index: 0,
      component: <AdminCompanyList />,
    },
    {
      label: 'Công ty',
      index: 1,
      component: <AdminCompanyAccept />,
    },
    {
      label: '😶Thống kê',
      index: 2,
      component: <div>Quan tâm</div>,
    },
    {
      label: '🇻🇳',
      index: 3,
      component: <div>Thông báo</div>,
    },
  ];
  return (
    <Box
      style={{
        minHeight: '52vh',
      }}
    >
      <TabComponent tabList={tabList} />
    </Box>
  );
};

export default AdminTabs;
