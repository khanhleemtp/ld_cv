import React from 'react';
import { Box, TextField, makeStyles } from '@material-ui/core';
import { Controller } from 'react-hook-form';
import clsx from 'clsx';
import { useResume } from '../../../contexts/useResume';

const useStyles = makeStyles((theme) => ({
  root: {
    fontWeight: ({ record, name, title }) => {
      if (record === 'header') {
        return theme.typography.fontWeightMedium;
      }
      if (record === 'section') {
        if (name || title) return theme.typography.fontWeightBold;
      }
    },
    fontSize: ({ typeText }) => typeText && theme.typography[typeText].fontSize,
    color: ({ record, title }) => {
      return record === 'header' && title && theme.palette.grey[600];
    },
  },
  skill: {
    whiteSpace: ['pre-wrap', '!important'],
    lineHeight: '16px',
    width: '100%',
    minWidth: '100px',
    maxWidth: '160px',
    padding: 2,
  },
  blueTitle: {
    color: [theme.palette.primary.title, '!important'],
  },
  underline: {
    '&:hover:not(.Mui-disable):before': {
      borderBottom: ({ record, title }) =>
        record === 'section' && title && `3px solid ${theme.palette.grey[900]}`,
    },
    '&:before': {
      borderBottom: ({ record, title }) =>
        record === 'section' && title && '3px solid #000',
    },
    '&:after': {
      borderBottom: ({ record, title }) =>
        record === 'section' && title && `3px solid ${theme.palette.grey[400]}`,
    },
  },
  inputMultiline: {
    marginBottom: ({ record, title }) =>
      record === 'section' && title && theme.spacing(1),
    textTransform: ({ record, title }) =>
      record === 'section' && title && `uppercase`,
    fontWeight: ({ record, title }) => record === 'section' && title && `900`,
  },
  fontWeightRegular: {
    fontWeight: [theme.typography.fontWeightRegular, '!important'],
    color: theme.palette.grey[600],
  },
  textCenter: {
    '& textarea': {
      textAlign: ['center', '!important'],
    },
  },
  gpa: {
    width: theme.spacing(4),
  },
}));
const MuiTextField = ({
  typeText,
  icon,
  name,
  description,
  record,
  title,
  nameField,
  disableUnderline,
  placeholder,
  fontWeightRegular,
  addBullet,
  removeBullet,
  bullet,
  section,
  blueTitle,
  textCenter,
  gpa,
  label,
}) => {
  const classes = useStyles({
    typeText,
    name,
    description,
    record,
    title,
  });

  const { getValues, register, control } = useResume();
  register(nameField);
  return (
    <Box display="flex" alignItems="center">
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
            multiline={section === 'skills' || gpa ? false : true}
            fullWidth
            placeholder={placeholder}
            InputProps={{
              classes: {
                underline: clsx(classes.underline),
                inputMultiline: clsx(classes.inputMultiline),
                root: clsx(
                  { [classes.fontWeightRegular]: fontWeightRegular },
                  {
                    [classes.skill]: section === 'skills',
                  },
                  { [classes.blueTitle]: blueTitle },
                  {
                    [classes.textCenter]: textCenter,
                  },
                  {
                    [classes.gpa]: gpa,
                  },
                  classes.root,
                  classes.textarea
                ),
              },
              disableUnderline: disableUnderline,
            }}
            onKeyPress={
              bullet
                ? (e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addBullet();
                    }
                  }
                : null
            }
            onKeyDown={
              bullet
                ? (e) => {
                    if (e.key === 'Backspace' || e.key === 'Delete') {
                      removeBullet();
                    }
                  }
                : null
            }
            autoFocus={true}
          />
        )}
      />
    </Box>
  );
};

export default MuiTextField;
