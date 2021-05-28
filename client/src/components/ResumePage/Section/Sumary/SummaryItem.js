import React from 'react';
import MuiTextField from '../../Mui/MuiTextField';
const SummaryItem = ({ nameField }) => {
  return (
    <MuiTextField
      typeText="subtitle2"
      disableUnderline
      description
      record="section"
      nameField={`${nameField}.text`}
      placeholder="Hãy nói điều gì đó về bản thân"
    />
  );
};

export default SummaryItem;
