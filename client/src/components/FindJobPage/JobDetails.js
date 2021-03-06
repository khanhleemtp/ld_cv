import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { useDispatch, useSelector } from 'react-redux';
import { getjobById, jobSelector } from '../../features/Job/JobSlice';
import { useHistory, useParams } from 'react-router-dom';
import moment from 'moment';
import { Grid } from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import Box from '@material-ui/core/Box';
import { Link } from 'react-router-dom';
import { createApply } from '../../features/Apply/ApplySlice';
import { TokenService } from '../../services/TokenService';
import { userSelector } from '../../features/User/UserSlice';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
  chip: {
    margin: 2,
    textTransform: 'capitalize',
  },
  img: {
    objectFit: 'contain',
  },
}));

const JobDetails = () => {
  const classes = useStyles();
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getjobById(id));
    return () => {};
  }, [dispatch, id]);
  const { job } = useSelector(jobSelector);
  const { user } = useSelector(userSelector);

  const handleApply = () => {
    if (!TokenService.getToken()) return history.push('/signin');
    dispatch(createApply(() => history.push('/dashboard/apply')));
  };
  console.log('moment', moment() === moment(job?.to));

  return (
    <Container maxWidth="md">
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt="Contemplative Reptile"
            height="160"
            className={classes.img}
            image={job?.company?.photo}
            title="Contemplative Reptile"
          />
          <Divider />
          <CardActions>
            {moment() < moment(job?.to) && user?.role === 'user' && (
              <Button
                size="large"
                color="primary"
                variant="contained"
                onClick={handleApply}
              >
                ???ng tuy???n ngay
              </Button>
            )}
          </CardActions>
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Link
                  to={'/company/' + job?.company?._id}
                  style={{ textDecoration: 'none' }}
                >
                  <Typography gutterBottom variant="h4">
                    T??n c??ng ty: {job?.company?.name.toUpperCase()}
                  </Typography>
                </Link>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography gutterBottom variant="h6">
                  Ti??u ?????: {job?.title}
                </Typography>{' '}
                <Typography gutterBottom variant="body1">
                  N??i l??m vi???c: {job?.location}
                </Typography>{' '}
                <Typography gutterBottom variant="body1">
                  V??? tr??: {job?.position}
                  <Typography gutterBottom variant="body1">
                    L????ng: {job?.salary}
                  </Typography>
                  <Typography gutterBottom variant="body1">
                    Lo???i c??ng vi???c: {job?.type}
                  </Typography>
                  <Typography gutterBottom variant="body1">
                    Th???i gian ???ng tuy???n:{' '}
                    {moment(job?.createdAt).format('DD/MM/YYYY')} {' - '}
                    {moment(job?.to).format('DD/MM/YYYY')}
                  </Typography>
                </Typography>
                <Box flexBasis={1}>
                  <Typography variant="body1">K??? n??ng ch??nh: </Typography>
                  {job?.tags?.map((item) => (
                    <Chip
                      label={item}
                      key={item}
                      clickable
                      className={classes.chip}
                    />
                  ))}
                </Box>
              </Grid>

              <Grid item md={6}>
                <Typography variant="h5">M?? t??? c??ng vi???c</Typography>
                {job?.descriptions?.map((r) => (
                  <Box key={r}>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                      gutterBottom
                      style={{ marginLeft: 16 }}
                    >
                      {r}
                    </Typography>
                  </Box>
                ))}
                <Typography variant="h5">Y??u c???u c??ng vi???c</Typography>
                {job?.requirements?.map((r) => (
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                    key={r}
                    gutterBottom
                    style={{ marginLeft: 16 }}
                  >
                    {r}
                  </Typography>
                ))}
              </Grid>
            </Grid>
          </CardContent>
        </CardActionArea>
      </Card>
    </Container>
  );
};

export default JobDetails;
