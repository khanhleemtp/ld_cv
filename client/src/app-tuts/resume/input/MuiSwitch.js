import React from 'react';
import { Controller } from 'react-hook-form';
import { Switch } from '@material-ui/core';

const MuiSwitch = ({ control, nameField, label }) => {
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
        render={({ field }) => (
          <Switch
            onChange={(e) => field.onChange(e.target.checked)}
            checked={field.value}
          />
        )}
      />
    </section>
  );
};

export default MuiSwitch;
