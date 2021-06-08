import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import React from 'react';
import { Controller } from 'react-hook-form';

const MuiSelect = ({ control, label, menus, nameField }) => {
  return (
    <section>
      <label
        style={{
          color: '#ec407a',
        }}
      >
        {label}
      </label>
      <Controller
        render={({ field }) => (
          <Select MenuProps={{ disableScrollLock: true }} {...field} fullWidth>
            {menus?.map((item) => (
              <MenuItem key={item.text} value={item.value}>
                {item.text}
              </MenuItem>
            ))}
          </Select>
        )}
        name={nameField}
        control={control}
      />
    </section>
  );
};

export default MuiSelect;
