import { useFieldArray } from 'react-hook-form';
import { useResume } from '../../../contexts/useResume';

export const useResumeSetting = (sectionIndex) => {
  const {
    control,
    removeSection,
    watch,
    register,
    getValues,
    handleUpSection,
    handleDownSection,
  } = useResume();

  const { fields, append, remove, swap } = useFieldArray({
    control,
    name: `sections[${sectionIndex}].items`,
  });

  const handleRemoveField = (fieldIndex) => {
    return () => {
      remove(fieldIndex);
    };
  };

  const handleDownField = (fieldIndex) => {
    return () => {
      if (fieldIndex === fields.length - 1) return;
      swap(fieldIndex, fieldIndex + 1);
    };
  };

  const handleUpField = (fieldIndex) => {
    return () => {
      if (fieldIndex === 0) return;
      swap(fieldIndex, fieldIndex - 1);
    };
  };

  const handleAddField = (data) => async () => append(data);

  const isHiddenUp = (fieldIndex) => {
    return fieldIndex === 0;
  };
  const isHiddenDown = (fieldIndex) => {
    return fieldIndex === fields.length - 1;
  };

  return {
    control,
    removeSection,
    fields,
    watch,
    register,
    getValues,
    append,
    isHiddenUp,
    isHiddenDown,
    handleDownField,
    handleUpField,
    handleRemoveField,
    handleAddField,
    handleDownSection,
    handleUpSection,
  };
};
