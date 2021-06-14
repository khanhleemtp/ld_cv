import React from 'react';
import Box from '@material-ui/core/Box';
import CreateJob from './CreateJob';
import CompanyUpdateInfo from './CompanyUpdateInfo';
import CompanyListJob from './CompanyListJobs';
import TabLink from '../UI/TabLink';

const listTabs = [
  {
    index: 0,
    component: <CompanyUpdateInfo />,
    label: 'Cập nhật thông tin',
    page: 'update-company',
  },
  {
    index: 1,
    component: <CreateJob />,
    label: 'Tạo việc',
    page: 'create-job',
  },
  {
    index: 2,
    component: <CompanyListJob />,
    label: 'Danh sách việc',
    page: 'list-job',
  },
];

const CompanyManagerTabs = () => {
  return (
    <Box
      style={{
        minHeight: '52vh',
      }}
    >
      {/* <TabComponent tabList={tabList} /> */}
      <TabLink rootLink="manager-company" listTabs={listTabs} />
    </Box>
  );
};

export default CompanyManagerTabs;
