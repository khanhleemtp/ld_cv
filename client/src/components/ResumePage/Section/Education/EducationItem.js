import { Box } from '@material-ui/core';
import React from 'react';
import MuiDatePicker from '../../Mui/MuiDatePicker';
import MuiTextField from '../../Mui/MuiTextField';
import ResumeBulletSection from '../Bullets';
import RoomOutlinedIcon from '@material-ui/icons/RoomOutlined';

const EducationItem = ({ nameField, watchObj }) => {
  const { showGpa, showBullets, showLocation, showDateRange } = watchObj;
  return (
    <>
      <MuiTextField
        typeText="h6"
        disableUnderline
        name
        record="section"
        nameField={`${nameField}.degree`}
        placeholder="Ngành học"
        fontWeightRegular
      />
      <MuiTextField
        typeText="subtitle1"
        disableUnderline
        name
        blueTitle
        record="section"
        nameField={`${nameField}.institution`}
        placeholder="Tên trường"
      />

      {showDateRange && (
        <Box display="flex" alignItems="center">
          <MuiDatePicker nameField={`${nameField}.from`} title="Từ" />
          <MuiDatePicker nameField={`${nameField}.to`} title="Đến" />
        </Box>
      )}
      <Box display="flex">
        {showLocation && (
          <MuiTextField
            typeText="subtitle2"
            disableUnderline
            description
            record="section"
            nameField={`${nameField}.location`}
            placeholder="Vị trí"
            icon={<RoomOutlinedIcon />}
          />
        )}
        {showGpa && (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            borderLeft={1}
            maxWidth={120}
          >
            <MuiTextField
              typeText="subtitle1"
              disableUnderline
              record="section"
              nameField={`${nameField}.gpaText`}
              placeholder="Gpa Text"
              textCenter
            />
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-around"
            >
              <MuiTextField
                typeText="subtitle1"
                disableUnderline
                record="section"
                nameField={`${nameField}.gpa`}
                placeholder="Gpa"
                textCenter
                gpa
              />
              <Box textAlign="center">/</Box>
              <MuiTextField
                typeText="subtitle1"
                disableUnderline
                record="section"
                nameField={`${nameField}.maxGpa`}
                placeholder="MaxGpa"
                textCenter
                gpa
              />
            </Box>
          </Box>
        )}
      </Box>

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

export default EducationItem;
