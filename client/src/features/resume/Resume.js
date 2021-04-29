import React from 'react';
import CenteredTabs from '../../components/ListTab';
import { Paper, Box, Container, makeStyles } from '@material-ui/core';
import Header from '../../components/resume/temp1/Header';

const listItems = [
  {
    label: '😄',
    path: '/#resumes',
  },
  {
    label: ' 😆',
    path: '/#findsjob',
  },
  {
    label: ' 🙃',
    path: '/d',
  },
  {
    label: ' 😆',
    path: '/e',
  },
  {
    label: ' 😆',
    path: '/f',
  },
  {
    label: '😁',
    path: '/abc',
  },
  {
    label: ' 😋',
    path: 'f',
  },
  {
    label: ' 😛',
    path: 'g',
  },
];

const useStyles = makeStyles((theme) => ({
  cvRoot: {
    padding: theme.spacing(1),
    borderRadius: 4,
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(8),
    },
  },
}));

const Resume = () => {
  const classes = useStyles();
  return (
    <>
      <CenteredTabs list={listItems} />
      Resume page
      <Box display="flex" alignItems="center" justifyContent="center">
        <Paper
          style={{
            maxWidth: '940px',
            background: `url('bg.png')`,
            backgroundSize: 'cover',
          }}
        >
          <Container className={classes.cvRoot}>
            <Header />
          </Container>
        </Paper>
      </Box>
    </>
  );
};

export default Resume;
