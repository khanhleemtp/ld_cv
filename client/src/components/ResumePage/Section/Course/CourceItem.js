import React from 'react';
import MuiTextField from '../../Mui/MuiTextField';

function CourceItem({ nameField, watchObj }) {
  const { showDescription } = watchObj;
  return (
    <>
      <MuiTextField
        typeText="subtitle1"
        disableUnderline
        name
        record="section"
        nameField={`${nameField}.title`}
        placeholder="Tên chứng chỉ"
        blueTitle
      />
      {showDescription && (
        <MuiTextField
          typeText="subtitle1"
          disableUnderline
          description
          record="section"
          nameField={`${nameField}.description`}
          placeholder="Chi tiết"
        />
      )}
    </>
  );
}

export default CourceItem;
