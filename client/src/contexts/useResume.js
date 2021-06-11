import React, { useContext, useEffect, createContext, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import {
  getResumesById,
  resumeSelector,
  updateResume,
} from '../features/Resume/ResumeSlice';
// import { getResumeData } from '../pages/ResumePage/data';
import { useParams } from 'react-router-dom';

const ResumeContext = createContext();
export const useResume = () => {
  return useContext(ResumeContext);
};

export const ResumeWrapper = ({ children }) => {
  let { id } = useParams();
  console.log(id);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getResumesById({ id }));
  }, [dispatch, id]);
  const { resume } = useSelector(resumeSelector);

  return resume ? (
    <ResumeProvider data={resume}>{children}</ResumeProvider>
  ) : (
    <div>Loading...</div>
  );
};

export const ResumeProvider = ({ children, data }) => {
  const dispatch = useDispatch();
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
    defaultValues: data,
    mode: 'onChange',
  });
  const { fields, append, swap, move } = useFieldArray({
    control,
    name: 'sections',
  });

  useEffect(() => {
    reset(data);
  }, [reset, data]);

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
    return () => setValue(`sections.${sectionIndex}.enabled`, false);
  };

  const handleUpdateResume = handleSubmit((d) => {
    console.log('Resuem', d);
    dispatch(updateResume(d));
  });

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
    handleUpdateResume,
  };

  return (
    <ResumeContext.Provider value={value}>{children}</ResumeContext.Provider>
  );
};
