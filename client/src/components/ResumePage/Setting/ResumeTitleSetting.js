import React from 'react';
import { makeStyles } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import SettingIcon from './SettingIcon';
import TableChartOutlinedIcon from '@material-ui/icons/TableChartOutlined';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import ExpandLessOutlinedIcon from '@material-ui/icons/ExpandLessOutlined';
import ExpandMoreOutlinedIcon from '@material-ui/icons/ExpandMoreOutlined';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));
const ResumeTitleSetting = ({
  handleAddField,
  removeSection,
  handleUpSection,
  handleDownSection,
}) => {
  const classes = useStyles();
  const listSettings = [
    {
      component: (
        <SettingIcon icon={<AddCircleOutlineOutlinedIcon />} text="Thêm mới" />
      ),
      onClick: handleAddField,
    },
    {
      component: (
        <SettingIcon
          icon={<DeleteOutlineOutlinedIcon />}
          title="Xóa thành phần"
        />
      ),
      onClick: removeSection,
    },
    {
      component: (
        <SettingIcon icon={<TableChartOutlinedIcon />} title="Điều khiển" />
      ),
      onClick: () => {
        console.log('abc');
      },
    },
    {
      component: <SettingIcon icon={<ExpandLessOutlinedIcon />} title="Lên" />,
      onClick: handleUpSection,
    },
    {
      component: (
        <SettingIcon icon={<ExpandMoreOutlinedIcon />} title="Xuống" />
      ),
      onClick: handleDownSection,
    },
  ];
  return (
    <Box className={classes.root}>
      {listSettings.map((item, index) => (
        <Box onClick={item.onClick} key={index}>
          {item.component}
        </Box>
      ))}
    </Box>
  );
};

export default ResumeTitleSetting;
