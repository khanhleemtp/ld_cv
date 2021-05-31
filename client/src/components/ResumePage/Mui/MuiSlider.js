import { Controller } from 'react-hook-form';
import Slider from '@material-ui/core/Slider/Slider.js';
import { useResume } from '../../../contexts/useResume';

const MuiSlider = ({ nameField }) => {
  const { getValues, control, register } = useResume();
  register(nameField);
  return (
    <section>
      <Controller
        name={nameField}
        control={control}
        defaultValue={getValues(nameField) || 0}
        render={({ field }) => (
          <Slider
            {...field}
            onChange={(_, value) => {
              field.onChange(value);
            }}
            valueLabelDisplay="auto"
            max={10}
            step={1}
          />
        )}
      />
    </section>
  );
};

export default MuiSlider;
