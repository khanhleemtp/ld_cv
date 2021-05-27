import React from 'react';
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup as Group,
} from '@material-ui/core';

const RadioGroup = (props) => {
  const { label, name, items, onChange, value } = props;
  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <Group row value={value} onChange={onChange} name={name}>
        {items.map((item) => (
          <FormControlLabel
            key={item.id}
            label={item.title}
            value={item.id}
            control={<Radio />}
          />
        ))}
      </Group>
    </FormControl>
  );
};

export default RadioGroup;
