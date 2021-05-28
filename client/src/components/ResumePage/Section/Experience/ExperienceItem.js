import React from 'react';
import MuiDatePicker from '../../Mui/MuiDatePicker';
import MuiTextField from '../../Mui/MuiTextField';
import ResumeBulletSection from '../Bullets';
import RoomOutlinedIcon from '@material-ui/icons/RoomOutlined';
import { Box } from '@material-ui/core';

const ExperienceItem = ({ nameField, watchObj }) => {
  const {
    showDescription,
    showTitle,
    showBullets,
    showLocation,
    showDateRange,
    showCompany,
  } = watchObj;

  return (
    <>
      {showTitle && (
        <MuiTextField
          typeText="h6"
          disableUnderline
          name
          record="section"
          nameField={`${nameField}.position`}
          placeholder="Vị trí"
          fontWeightRegular
        />
      )}
      {showCompany && (
        <MuiTextField
          typeText="subtitle1"
          disableUnderline
          name
          blueTitle
          record="section"
          nameField={`${nameField}.workplace`}
          placeholder="Tên công ty"
        />
      )}
      {showDateRange && (
        <Box display="flex" alignItems="center">
          <MuiDatePicker nameField={`${nameField}.from`} />
          <MuiDatePicker nameField={`${nameField}.to`} />
        </Box>
      )}
      {showLocation && (
        <MuiTextField
          typeText="subtitle2"
          disableUnderline
          description
          record="section"
          nameField={`${nameField}.location`}
          placeholder="Địa điểm"
          icon={<RoomOutlinedIcon />}
        />
      )}

      {showDescription && (
        <MuiTextField
          typeText="subtitle2"
          disableUnderline
          description
          record="section"
          nameField={`${nameField}.description`}
          placeholder="Mô tả công việc"
        />
      )}
      {showBullets && (
        <ResumeBulletSection
          nameField={`${nameField}.bullets`}
          data={{ name: '' }}
          record="experience"
        />
      )}
    </>
  );
};

export default ExperienceItem;
