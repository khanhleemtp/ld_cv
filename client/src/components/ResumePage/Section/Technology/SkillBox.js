import { Box } from '@material-ui/core';
import React from 'react';
import MuiTextField from '../../Mui/MuiTextField';

const SkillBox = ({ nameField, addBullet, removeBullet }) => {
  return (
    <Box display="flex" marginBottom={1}>
      <MuiTextField
        typeText="subtitle1"
        record="section"
        nameField={nameField}
        placeholder="Skill/Tech"
        title
        addBullet={addBullet}
        removeBullet={removeBullet}
        bullet
        section="skills"
      />
    </Box>
  );
};

export default SkillBox;
