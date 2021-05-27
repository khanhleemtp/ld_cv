import React, {
  useContext,
  useEffect,
  createContext,
  useCallback,
} from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { dataFromServer } from '../pages/ResumePage/data';
// import { DevTool } from '@hookform/devtools';

const ResumeContext = createContext();
export const useResume = () => {
  return useContext(ResumeContext);
};

export const ResumeProvider = ({ children }) => {
  const {
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    getValues,
    register,
    unregister,
    setFocus,
  } = useForm({
    defaultValues: {},
  });

  const { fields, append, remove, swap } = useFieldArray({
    control,
    name: 'sections',
  });

  useEffect(() => {
    reset(dataFromServer);
  }, [reset]);

  const handleDownSection = (fieldIndex) => {
    return () => {
      if (fieldIndex === fields.length - 1) return;
      swap(fieldIndex, fieldIndex + 2);
    };
  };

  const handleUpSection = (fieldIndex) => {
    return () => {
      if (fieldIndex === 0) return;
      swap(fieldIndex, fieldIndex - 2);
    };
  };

  const removeSection = useCallback(
    (sectionIndex) => {
      return () => remove(sectionIndex);
    },
    [remove]
  );

  const value = {
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    getValues,
    register,
    fields,
    append,
    removeSection,
    unregister,
    setFocus,
    handleUpSection,
    handleDownSection,
  };

  return (
    <ResumeContext.Provider value={value}>{children}</ResumeContext.Provider>
  );
};
