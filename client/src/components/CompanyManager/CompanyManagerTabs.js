import React from 'react';
import Box from '@material-ui/core/Box';
import TabComponent from '../UI/TabComponent';
import CreateJob from './CreateJob';
import CompanyUpdateInfo from './CompanyUpdateInfo';
import CompanyListJob from './CompanyListJobs';

const tabList = [
  {
    label: 'Cập nhật thông tin',
    index: 0,
    component: <CompanyUpdateInfo />,
  },
  {
    label: 'Tạo việc',
    index: 1,
    component: <CreateJob />,
  },
  {
    label: 'Danh sách việc',
    index: 2,
    component: <CompanyListJob />,
  },
];
const CompanyManagerTabs = () => {
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

export default CompanyManagerTabs;
