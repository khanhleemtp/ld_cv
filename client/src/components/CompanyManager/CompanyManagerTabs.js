import React from 'react';
import Box from '@material-ui/core/Box';
import TabComponent from '../UI/TabComponent';
import CreateJob from './CreateJob';
import CompanyUpdateInfo from './CompanyUpdateInfo';

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
    label: 'Ứng viên',
    index: 2,
    component: <div>Quan tâm</div>,
  },
  {
    label: 'Thông báo 🇻🇳',
    index: 3,
    component: <div>Thông báo</div>,
  },
  {
    label: 'Danh sách công việc',
    index: 4,
    component: <div>Thông báo</div>,
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
