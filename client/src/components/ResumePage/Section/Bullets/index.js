import { Box } from '@material-ui/core';
import React from 'react';

import MuiTextField from '../../Mui/MuiTextField';
import SkillBox from '../Technology/SkillBox';
import { useResumeBullet } from './useResumeBullets';

const ResumeBulletSection = ({ nameField, data, record }) => {
  const { control, fields, handleAppendBullet, removeBullet } =
    useResumeBullet(nameField);

  return fields.map((item, index) => (
    <Box key={item.id} marginLeft={1} display="flex" flex="1 1 0">
      {record === 'skills' ? (
        <SkillBox
          nameField={`${nameField}[${index}]`}
          defaultValue={item.name}
          control={control}
          addBullet={handleAppendBullet(index, data)}
          removeBullet={removeBullet(index)}
        />
      ) : (
        <>
          <Box padding={1}>*</Box>
          <Box flexGrow={1}>
            <MuiTextField
              typeText="subtitle2"
              disableUnderline
              description
              record="section"
              nameField={`${nameField}[${index}]`}
              placeholder="Chi tiết"
              fontWeightRegular
              addBullet={handleAppendBullet(index, data)}
              removeBullet={removeBullet(index)}
              bullet
            />
          </Box>
        </>
      )}
    </Box>
  ));
};

export default ResumeBulletSection;
