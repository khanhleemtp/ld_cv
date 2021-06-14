import React from 'react';
import Box from '@material-ui/core/Box';
import AdminCompanyList from './AdminCompanyList';
import AdminCompanyAccept from './AdminCompanyAccept';
import TabLink from '../UI/TabLink';

const AdminTabs = () => {
  const listTabs = [
    {
      index: 0,
      component: <AdminCompanyList />,
      label: 'Duyệt công ty',
      page: 'response-company',
    },
    {
      index: 1,
      component: <AdminCompanyAccept />,
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
