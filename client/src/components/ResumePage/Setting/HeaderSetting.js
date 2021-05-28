import React, { useState } from 'react';
import { makeStyles, Box } from '@material-ui/core';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import CameraAltOutlinedIcon from '@material-ui/icons/CameraAltOutlined';
import TriggerMenu from '../Section/TriggerMenu';
import UploadImageDialog from '../Section/Header/UploadImage/UploadImage';
import { useResume } from '../../../contexts/useResume';

const useStyles = makeStyles((theme) => ({
  icon: {
    fontSize: '18px',
    alignItems: 'center',
    marginLeft: '8px',
    marginRight: '8px',
  },
}));
const HeaderSetting = () => {
  const [open, setOpen] = useState(false);

  const { control, setValue, watch } = useResume();

  const classes = useStyles();
  return (
    <>
      <TriggerMenu
        component={
          <SettingsOutlinedIcon className={classes.icon} title="Hiển thị" />
        }
        listItem={[
          {
            label: 'Email',
            nameField: 'header.showEmail',
          },
          {
            label: 'Mạng xã hội',
            nameField: 'header.showLink',
          },
          {
            label: 'Nơi ở',
            nameField: 'header.showLocation',
          },
          {
            label: 'Điện thoại',
            nameField: 'header.showPhone',
          },
          {
            label: 'Vị trí',
            nameField: 'header.showTitle',
          },
          {
            label: 'Ảnh',
            nameField: 'header.showPhoto',
          },
        ]}
      />
      <Box
        padding={1}
        marginX={1}
        onClick={() => {
          setOpen(true);
        }}
        title="Ảnh"
      >
        <CameraAltOutlinedIcon className={classes.icon} />
      </Box>
      <UploadImageDialog
        open={open}
        setOpen={setOpen}
        setValue={setValue}
        watch={watch}
        control={control}
      />
    </>
  );
};

export default HeaderSetting;
