import React from 'react';
import Box from '@material-ui/core/Box';
import TabComponent from '../UI/TabComponent';
import DashboardUserInfo from './DashboardUserInfo';
import DashboardUserCv from './DashboardUserCv';
import DashboardUserApply from './DashboardUserApply';

const DashboardTabs = () => {
  const tabList = [
    {
      label: 'Thông tin',
      index: 0,
      component: <DashboardUserInfo />,
    },
    {
      label: 'CV',
      index: 1,
      component: <DashboardUserCv />,
    },
    {
      label: 'Ứng tuyển',
      index: 2,
      component: <DashboardUserApply />,
    },
    {
      label: 'Ứng tuyển 😁',
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

export default DashboardTabs;
