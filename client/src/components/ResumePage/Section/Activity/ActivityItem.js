import Box from '@material-ui/core/Box';
import React from 'react';
import MuiDatePicker from '../../Mui/MuiDatePicker';
import MuiTextField from '../../Mui/MuiTextField';
import ResumeBulletSection from '../Bullets';
import RoomOutlinedIcon from '@material-ui/icons/RoomOutlined';

const ActivityItem = ({ nameField, watchObj }) => {
  const {
    showDescription,
    showTitle,
    showCompany,
    showBullets,
    showLocation,
    showDateRange,
  } = watchObj;

  return (
    <>
      {showTitle && (
        <MuiTextField
          typeText="h6"
          disableUnderline
          name
          record="section"
          nameField={`${nameField}.title`}
          placeholder="Vị trí tham gia :"
          label="Vị trí tham gia"
          fontWeightRegular
          blueTitle
        />
      )}
      {showCompany && (
        <MuiTextField
          typeText="h6"
          blueTitle
          disableUnderline
          name
          record="section"
          nameField={`${nameField}.location`}
          placeholder="Địa điểm"
          fontWeightRegular
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

export default ActivityItem;
