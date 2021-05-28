import React from 'react';
import MuiTextField from '../../Mui/MuiTextField';

function AchievementItem({ nameField, watchObj }) {
  const { showDescription } = watchObj;
  return (
    <>
      <MuiTextField
        typeText="subtitle1"
        disableUnderline
        name
        record="section"
        nameField={`${nameField}.title`}
        placeholder="Tên thành tích"
        blueTitle
      />
      {showDescription && (
        <MuiTextField
          typeText="subtitle1"
          disableUnderline
          description
          record="section"
          nameField={`${nameField}.description`}
          placeholder="Mô tả"
        />
      )}
    </>
  );
}

export default AchievementItem;
