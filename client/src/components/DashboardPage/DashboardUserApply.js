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
import { makeStyles } from '@material-ui/core';
import moment from 'moment';
import {
  applySelector,
  getApplyByUserId,
} from '../../features/Apply/ApplySlice';

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

const DashboardUserApply = () => {
  const dispatch = useDispatch();
  // const handleDelete = (id) => {
  //   return () => dispatch(deleteResume({ id }));
  // };

  // const handleCreate = () => {
  //   dispatch(createResume());
  // };

  useEffect(() => {
    dispatch(getApplyByUserId());
  }, [dispatch]);

  const { isFetching, applies } = useSelector(applySelector);
  const classes = useStyles();
  console.log(applies);
  return (
    <Box display="flex" flexDirection="column">
      <Typography variant="h5">Danh sách ứng tuyển: </Typography>
      {isFetching ? (
        <Typography variant="caption">Loading...</Typography>
      ) : (
        <Grid container spacing={3}>
          {applies?.map((apply) => (
            <Grid item key={apply._id} className={classes.root} md={6} xs={12}>
              <Link to={`jobs/${apply?.job?._id}`} title="Chi tiết">
                <Box display="flex" alignItems="center">
                  <Typography variant="body1">
                    Trạng thái: {apply?.status}
                  </Typography>
                </Box>
                <Typography variant="body1" color="primary">
                  Tiêu đề: {apply?.job?.title}
                </Typography>
                <Typography variant="body1" color="primary">
                  Vị trí: {apply?.job?.position}
                </Typography>
                <Typography variant="overline">
                  Thời gian ứng tuyển:{' '}
                  {moment(apply?.createdAt).format('DD/MM/YYYY')}
                </Typography>
                {apply?.responseAt && (
                  <Typography variant="overline">
                    Thời gian phản hồi:{' '}
                    {moment(apply?.responseAt).format('DD/MM/YYYY')}
                  </Typography>
                )}
              </Link>
              <Box>
                <IconButton
                  // color="secondary"
                  aria-label="upload picture"
                  component="span"
                  title="Xóa"
                  // onClick={handleDelete(apply?.id)}
                >
                  <DeleteOutlinedIcon />
                </IconButton>
              </Box>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default DashboardUserApply;
