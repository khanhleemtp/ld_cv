import React, {
  useContext,
  useEffect,
  createContext,
  useMemo,
  useState,
} from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { dataFromServer } from '../pages/ResumePage/data';

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
    mode: 'onChange',
  });

  const { fields, append, remove, swap, move } = useFieldArray({
    control,
    name: 'sections',
  });

  const getDatas = useMemo(() => () => dataFromServer, []);

  useEffect(() => {
    reset(getDatas());
  }, [reset, getDatas]);

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

  const removeSection = (sectionIndex) => {
    return async () => remove(sectionIndex);
  };

  const handleDrag = ({ source, destination }) => {
    if (destination) {
      move(source.index, destination.index);
    }
  };

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
    handleDrag,
  };

  return (
    <ResumeContext.Provider value={value}>{children}</ResumeContext.Provider>
  );
};
