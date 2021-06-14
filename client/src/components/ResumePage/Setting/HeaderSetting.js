import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import CameraAltOutlinedIcon from '@material-ui/icons/CameraAltOutlined';
import TriggerMenu from '../Section/TriggerMenu';
import { useResume } from '../../../contexts/useResume';
import UploadImage from '../../UI/UploadImage/UploadImage';
import { useSelector } from 'react-redux';
import { resumeSelector } from '../../../features/Resume/ResumeSlice';
import { userSelector } from '../../../features/User/UserSlice';

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
  const { resume } = useSelector(resumeSelector);

  const { user } = useSelector(userSelector);
  const isEnabled = resume?.user?._id === user._id;
  const { control, setValue } = useResume();

  const classes = useStyles();
  return (
    <>
      <TriggerMenu
        component={
          isEnabled && (
            <SettingsOutlinedIcon className={classes.icon} title="Hiển thị" />
          )
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
      {isEnabled && (
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
      )}
      {/* <UploadImageDialog
        open={open}
        setOpen={setOpen}
        setValue={setValue}
        watch={watch}
        control={control}
      /> */}
      <UploadImage
        open={open}
        setOpen={setOpen}
        setValue={setValue}
        control={control}
        field={'header.photo'}
      />
    </>
  );
};

export default HeaderSetting;
