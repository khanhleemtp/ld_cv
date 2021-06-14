import React from 'react';
import Box from '@material-ui/core/Box';
// import AdminCompanyAccept from './AdminCompanyAccept';
import TabLink from '../UI/TabLink';
import AdminResponse from './AdminResponse';
import AdminListCompany from './AdminListCompany';

const AdminTabs = () => {
  const listTabs = [
    {
      index: 0,
      component: <AdminResponse />,
      label: 'Duyệt công ty',
      page: 'response-company',
    },
    {
      index: 1,
      component: <AdminListCompany />,
      label: 'Danh sách công ty',
      page: 'list-company',
    },
  ];

  return (
    <Box
      style={{
        minHeight: '52vh',
      }}
    >
      <TabLink rootLink="admin" listTabs={listTabs} />
    </Box>
  );
};

export default AdminTabs;
