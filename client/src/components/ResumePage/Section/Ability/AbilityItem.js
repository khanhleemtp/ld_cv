import React from 'react';
import { useWatch } from 'react-hook-form';
import { useResume } from '../../../../contexts/useResume';
import MuiSlider from '../../Mui/MuiSlider';
import MuiTextField from '../../Mui/MuiTextField';

const AbilityItem = ({ parentField, nameField }) => {
  const { control } = useResume();
  const showSlider = useWatch({
    control,
    name: `${parentField}.showSlider`,
  });

  return (
    <>
      <MuiTextField
        typeText="subtitle1"
        disableUnderline
        name
        record="section"
        nameField={`${nameField}.name`}
        placeholder="Name"
        blueTitle
      />
      {showSlider && (
        <>
          <MuiSlider
            typeText="subtitle2"
            disableUnderline
            description
            record="section"
            nameField={`${nameField}.level`}
            placeholder="Level"
          />
        </>
      )}
    </>
  );
};

export default AbilityItem;
