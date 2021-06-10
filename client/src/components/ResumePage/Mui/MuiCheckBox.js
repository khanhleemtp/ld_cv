import React from 'react';
import { Controller } from 'react-hook-form';
import { useResume } from '../../../contexts/useResume';
import { Checkbox } from '@material-ui/core';
const MuiCheckBox = ({ nameField }) => {
  const { control, register, getValues } = useResume();
  register(nameField);
  return (
    <section>
      <Controller
        defaultValue={getValues(nameField)}
        name={nameField}
        control={control}
        render={({ field }) => (
          <Checkbox
            onChange={(e) => field.onChange(e.target.checked)}
            checked={field.value}
          />
        )}
      />
    </section>
  );
};

export default MuiCheckBox;
