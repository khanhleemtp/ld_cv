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
const useStyles = makeStyles((theme) => ({
  chip: {
    margin: 2,
    textTransform: 'capitalize',
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

  const handleApply = () => {
    if (!TokenService.getToken()) return history.push('/signin');
    dispatch(createApply(() => history.push('/dashboard/apply')));
  };

  return (
    <Container maxWidth="md">
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt="Contemplative Reptile"
            height="160"
            image={job?.companyFrom?.photo}
            title="Contemplative Reptile"
          />
          <CardActions>
            <Button
              size="large"
              color="primary"
              variant="contained"
              onClick={handleApply}
            >
              Ứng tuyển ngay
            </Button>
          </CardActions>
          <CardContent>
            <Grid container>
              <Grid item xs={12}>
                <Link
                  to={'/company/' + job?.company}
                  style={{ textDecoration: 'none' }}
                >
                  <Typography gutterBottom variant="h4">
                    Tên công ty: {job?.companyFrom?.name.toUpperCase()}
                  </Typography>
                </Link>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography gutterBottom variant="body1">
                  Tiêu đề: {job?.title}
                </Typography>{' '}
                <Typography gutterBottom variant="body1">
                  Nơi làm việc: {job?.location}
                </Typography>{' '}
                <Typography gutterBottom variant="body1">
                  Vị trí: {job?.position}
                  <Typography gutterBottom variant="body1">
                    Lương: {job?.salary}
                  </Typography>
                  <Typography gutterBottom variant="body1">
                    Loại công việc: {job?.type}
                  </Typography>
                  <Typography gutterBottom variant="body1">
                    Thời gian ứng tuyển:{' '}
                    {moment(job?.createdAt).format('DD/MM/YYYY')} {' - '}
                    {moment(job?.to).format('DD/MM/YYYY')}
                  </Typography>
                </Typography>
                <Box flexBasis={1}>
                  <Typography variant="body1">Kỹ năng chính: </Typography>
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
                <Typography variant="h5">Mô tả công việc</Typography>
                {job?.descriptions?.map((r) => (
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
                <Typography variant="h5">Yêu cầu công việc</Typography>
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
