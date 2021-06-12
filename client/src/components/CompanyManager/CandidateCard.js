import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Box from '@material-ui/core/Box';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateApply } from '../../features/Apply/ApplySlice';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    margin: 8,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  chip: {
    margin: 2,
  },
}));

const CandidateCard = ({ user, resumes, id }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const handleResponse = (status) => () =>
    dispatch(
      updateApply({
        id,
        status,
        cb: () => history.go(0),
        user: user?._id,
      })
    );

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          Ứng viên: {user?.name}
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          Email: {user?.email}
        </Typography>
        <Typography>Danh sách CV:</Typography>
        {resumes?.map((resume) => (
          <Box key={resume._id} margin={1}>
            <Link to={'/resumes/' + resume._id}>Xem CV</Link>
            <Typography variant="body2" color="primary" gutterBottom>
              Vai trò: {resume?.header?.title}
            </Typography>
            {resume?.tags?.map((tag) => (
              <Chip label={tag} key={tag} clickable className={classes.chip} />
            ))}
          </Box>
        ))}
        <CardActions>
          <Button
            size="large"
            variant="outlined"
            onClick={handleResponse('accept')}
          >
            Chấp nhận
          </Button>
          <Button
            size="large"
            color="primary"
            variant="outlined"
            onClick={handleResponse('reject')}
          >
            Từ chối
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default CandidateCard;
