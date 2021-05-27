import React, { useState, useCallback } from 'react';
import { ReactHeight } from 'react-height';
import { Paper, Box, Container, makeStyles, Grid } from '@material-ui/core';
import Header from '../../components/resume/it/Header';
import Achievements from '../../components/resume/it/Achievements';
import Project from '../../components/resume/it/Project';
import { useForm } from 'react-hook-form';

const defaultValues = {
  header: {
    email: 'name@gmail.com',
    height: 142,
    link: 'angel.co/__NAME__',
    location: 'Seattle, WA',
    name: 'IAN PETERSEN',
    phone: '+1-779-116-5544',
    photo: 'https://thisresumedoesnotexist.com/avatars/6.jpg',
    photoStyle: 'round',
    record: 'Header',
    showEmail: true,
    showLink: true,
    showLocation: true,
    showPhone: false,
    showPhoto: false,
    showTitle: true,
    title:
      '15 years of performance-driven IT management in global manufacturing companies.',
    uppercaseName: true,
  },
  project: {
    title: 'LD',
  },
};

const useStyles = makeStyles((theme) => ({
  cvRoot: {
    padding: theme.spacing(1),
    borderRadius: 4,
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(8),
    },
  },
}));

const PageResume = () => {
  const classes = useStyles();
  const { control, getValues, setValue } = useForm({ defaultValues });
  return (
    <Box display="flex" alignItems="center" justifyContent="center">
      <Paper
        style={{
          maxWidth: '940px',
          background: `url('bg.png')`,
          backgroundSize: 'cover',
          marginBottom: 36,
        }}
      >
        <Container className={classes.cvRoot}>
          <Header
            control={control}
            watch={watch}
            getValues={getValues}
            setValue={setValue}
          />
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Achievements control={control} />
            </Grid>
            <Grid item xs={12} md={6}>
              <Project control={control} project={getValues('project')} />
            </Grid>
          </Grid>
        </Container>
      </Paper>
    </Box>
  );
};

const Resume = () => {
  return (
    <ReactHeight
      onHeightReady={(height) => {
        console.log('height', height);
      }}
    >
      <PageResume />
    </ReactHeight>
  );
};

export default Resume;
