import React from 'react';
import { Link, Typography, Box } from '@material-ui/core';

const CopyRight = () => {
  return (
    <Box marginY={2}>
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://material-ui.com/">
          LD CV
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    </Box>
  );
};

export default CopyRight;
