import React from 'react';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const AdminCompanyItem = ({ company, btnAction }) => {
  return (
    <Paper
      variant="outlined"
      square
      elevation={2}
      style={{
        margin: 16,
        padding: 16,
        maxWidth: 360,
      }}
    >
      <Box>
        <Box></Box>
        <Typography variant="h6" color="primary">
          Công ty: {company?.name}
        </Typography>
        <Typography variant="body1">User: {company?.user?.name}</Typography>
        <Typography variant="body1">Email: {company?.user?.email}</Typography>
        <Typography variant="body1">Số điện thoại: {company?.phone}</Typography>
        <Typography variant="body1">Vị trí: {company?.position}</Typography>
        <Typography variant="body1">Địa điểm: {company?.location}</Typography>
        {btnAction && btnAction}
      </Box>
    </Paper>
  );
};
export default AdminCompanyItem;
