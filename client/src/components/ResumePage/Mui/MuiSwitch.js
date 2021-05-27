import React from 'react';
import { Controller } from 'react-hook-form';
import { Switch } from '@material-ui/core';
import { useResume } from '../../../contexts/useResume';

const MuiSwitch = ({ nameField, label }) => {
  const { getValues, control, register } = useResume();
  register(nameField);
  return (
    <section
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <label>{label}</label>
      <Controller
        name={nameField}
        control={control}
        defaultValue={getValues(nameField) || false}
        render={({ field }) => (
          <Switch
            onChange={(e) => field.onChange(e.target.checked)}
            checked={field.value || false}
          />
        )}
      />
    </section>
  );
};

export default MuiSwitch;
