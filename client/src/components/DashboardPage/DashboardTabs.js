import React from 'react';
import Box from '@material-ui/core/Box';
import DashboardUserInfo from './DashboardUserInfo';
import DashboardUserCv from './DashboardUserCv';
import DashboardUserApply from './DashboardUserApply';
import TabLink from '../UI/TabLink';

const DashboardTabs = () => {
  const listTabs = [
    {
      index: 0,
      component: <DashboardUserInfo />,
      label: 'Thông tin',
      page: 'info',
    },
    {
      index: 1,
      component: <DashboardUserCv />,
      label: 'CV',
      page: 'cv',
    },
    {
      index: 2,
      component: <DashboardUserApply />,
      label: 'Ứng tuyển',
      page: 'apply',
    },
  ];

  return (
    <Box
      style={{
        minHeight: '52vh',
      }}
    >
      <TabLink listTabs={listTabs} rootLink="dashboard" />
    </Box>
  );
};

export default DashboardTabs;
