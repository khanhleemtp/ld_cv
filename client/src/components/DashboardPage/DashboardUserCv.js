import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import Grid from '@material-ui/core/Grid';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import {
  getResumesUser,
  resumeSelector,
  deleteResume,
  createResume,
} from '../../features/Resume/ResumeSlice';
import { makeStyles } from '@material-ui/core';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
  root: {
    '& a': {
      textDecoration: 'none',
    },
    border: `3px solid ${theme.palette.primary.header}`,
    maxWidth: theme.spacing(48),
    display: 'flex',
    alignItems: 'cemter',
    justifyContent: 'space-between',
    margin: theme.spacing(2),
    padding: theme.spacing(3),
    borderRadius: theme.spacing(1),
    minHeight: theme.spacing(16),
  },
  addBtn: {
    maxWidth: theme.spacing(16),
    marginBottom: theme.spacing(4),
  },
}));

const DashboardUserCv = () => {
  const dispatch = useDispatch();
  const handleDelete = (id) => {
    return () => dispatch(deleteResume({ id }));
  };
  const handleCreate = () => {
    dispatch(createResume());
  };

  useEffect(() => {
    dispatch(getResumesUser());
  }, [dispatch]);

  const { resumes, isFetching, isError, errorMessage } =
    useSelector(resumeSelector);
  console.log(resumes);
  const classes = useStyles();
  return (
    <Box display="flex" flexDirection="column">
      <Button
        color="primary"
        variant="contained"
        endIcon={<AddCircleRoundedIcon />}
        className={classes.addBtn}
        onClick={handleCreate}
      >
        Tạo CV
      </Button>
      <Box height={16}>
        {isFetching && <Typography variant="caption">Loading...</Typography>}
        {isError && <Typography variant="error">{errorMessage}</Typography>}
      </Box>
      <Grid container spacing={3}>
        {resumes?.map((resume) => (
          <Grid item key={resume.id} className={classes.root} md={6} xs={12}>
            <Link to={`resumes/${resume.id}`} title="Chi tiết">
              <Box display="flex" alignItems="center">
                <Typography variant="body1" color="primary">
                  {resume?.title || 'CV: '}
                </Typography>
                <IconButton
                  // color="secondary"
                  aria-label="edit"
                  component="span"
                  title="Chỉnh sửa CV"
                >
                  <EditIcon />
                </IconButton>
              </Box>
              <Typography variant="overline">
                {moment(resume?.createdAt).format('DD/MM/YYYY')}
              </Typography>
              <Typography variant="body2">Id: {resume?.id}</Typography>
            </Link>
            <Box>
              <IconButton
                // color="secondary"
                aria-label="upload picture"
                component="span"
                title="Xóa"
                onClick={handleDelete(resume?.id)}
              >
                <DeleteOutlinedIcon />
              </IconButton>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default DashboardUserCv;
