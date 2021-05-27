import React from 'react';
import { Paper, Box, makeStyles, Button, Typography } from '@material-ui/core';
import { useResume } from '../../contexts/useResume';
import Masonry from 'react-masonry-css';
import ResumeSectionHeader from '../../components/ResumePage/Section/Header';
import './resume.css';
import ResumeRecordContainer from '../../components/ResumePage/Section/Container';

const useStyles = makeStyles((theme) => ({
  paper: {
    width: '940px',
    marginBottom: 36,
    backgroundColor: '#fff',
    background: `red url('bg.png') no-repeat right top`,
  },
  cvRoot: {
    flexGrow: 1,
    padding: theme.spacing(1),
    borderRadius: 4,
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(8),
    },
  },
}));

const breakpointColumnsObj = {
  default: 2,
  960: 2,
  700: 1,
  500: 1,
};

const PageResume = () => {
  const classes = useStyles();
  const { handleSubmit, fields } = useResume();

  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <Box display="flex" alignItems="center" justifyContent="center">
        <Paper className={classes.paper}>
          <Button type="submit">Save Data</Button>
          <Box className={classes.cvRoot}>
            <ResumeSectionHeader />
            <Masonry
              breakpointCols={breakpointColumnsObj}
              className="my-masonry-grid"
              columnClassName="my-masonry-grid_column"
            >
              {fields.map((item, index) => {
                return (
                  <ResumeRecordContainer
                    index={index}
                    key={item.id}
                    record={item.record}
                  />
                );
              })}
            </Masonry>
            <Box
              display="flex"
              justifyContent="flex-end"
              style={{ width: '100%' }}
            >
              <Typography variant="subtitle1" color="primary" component="h4">
                © ldcv.vn
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>
    </form>
  );
};

const Resume = () => {
  return <PageResume />;
};

export default Resume;
