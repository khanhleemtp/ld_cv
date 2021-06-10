import React from 'react';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import { Controller } from 'react-hook-form';

const MuiTextField = ({
  icon,
  nameField,
  placeholder,
  label,
  getValues,
  register,
  fullWidth,
  control,
}) => {
  register && register(nameField);
  return (
    <Box display="flex" alignItems="center" marginY={1} flexGrow={1}>
      {icon && (
        <Box
          marginRight={0.5}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {icon}
        </Box>
      )}
      <Controller
        control={control}
        name={nameField}
        defaultValue={getValues(nameField) || ''}
        render={({ field }) => (
          <TextField
            {...field}
            label={label}
            multiline={true}
            fullWidth={fullWidth || true}
            placeholder={placeholder}
          />
        )}
      />
    </Box>
  );
};

export default MuiTextField;
