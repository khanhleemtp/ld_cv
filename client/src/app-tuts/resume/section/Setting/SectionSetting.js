import React from 'react';

import { makeStyles, Box } from '@material-ui/core';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import TableChartOutlinedIcon from '@material-ui/icons/TableChartOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
const useStyles = makeStyles((theme) => ({
  icon: {
    fontSize: '18px',
    alignItems: 'center',
    marginLeft: '8px',
    marginRight: '8px',
  },
}));
const SectionSetting = ({ append, index, remove }) => {
  const classes = useStyles();
  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        boxShadow={1}
        padding={1}
        style={{
          background: '#00C091',
          color: '#fff',
          borderRadius: '20px 0 0 20px',
        }}
        onClick={() =>
          append({
            title: 'LD',
            description: 'Khánh',
          })
        }
      >
        New entry
        <AddCircleOutlineOutlinedIcon className={classes.icon} />
      </Box>
      <Box display="flex" alignItems="center">
        <DeleteOutlineOutlinedIcon
          className={classes.icon}
          onClick={() => remove(index)}
        />
      </Box>
      <Box display="flex" alignItems="center">
        <TableChartOutlinedIcon className={classes.icon} />
      </Box>
    </>
  );
};

export default SectionSetting;
