import React from 'react';
import { makeStyles, Box } from '@material-ui/core';
import SettingIcon from './SettingIcon';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import ExpandLessOutlinedIcon from '@material-ui/icons/ExpandLessOutlined';
import ExpandMoreOutlinedIcon from '@material-ui/icons/ExpandMoreOutlined';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';

import TriggerMenu from '../Section/TriggerMenu';

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

const ResumeSectionSetting = ({
  handleDownField,
  handleUpField,
  handleRemoveField,
  handleAddField,
  isHiddenUp,
  isHiddenDown,
  listTriggerMenu,
}) => {
  const classes = useStyles();

  const listSettings = [
    {
      component: (
        <SettingIcon
          icon={<AddCircleOutlineOutlinedIcon />}
          text="Add entity"
        />
      ),
      onClick: handleAddField,
    },
    {
      component: !isHiddenUp && (
        <SettingIcon icon={<ExpandLessOutlinedIcon />} />
      ),
      onClick: handleUpField,
    },
    {
      component: !isHiddenDown && (
        <SettingIcon icon={<ExpandMoreOutlinedIcon />} />
      ),
      onClick: handleDownField,
    },
    {
      component: <SettingIcon icon={<DeleteOutlineOutlinedIcon />} />,
      onClick: handleRemoveField,
    },
    {
      component: (
        <TriggerMenu
          component={<SettingIcon icon={<SettingsOutlinedIcon />} />}
          listItem={listTriggerMenu}
        />
      ),
      onClick: null,
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

export default ResumeSectionSetting;