import { useFieldArray } from 'react-hook-form';
import { useResume } from '../../../../contexts/useResume';

export const useResumeBullet = (nameField) => {
  const { control, getValues } = useResume();
  const { fields, insert, remove } = useFieldArray({
    control,
    name: nameField,
  });

  const handleAppendBullet = (index, data) => {
    return () =>
      insert(index + 1, data, {
        shouldFocus: true,
        focusIndex: index + 1,
      });
  };

  const removeBullet = (index) => {
    return () => {
      if (getValues(`${nameField}[${index}]`) === '' && index !== 0) {
        remove(index);
      }
    };
  };

  return {
    control,
    handleAppendBullet,
    fields,
    removeBullet,
  };
};
