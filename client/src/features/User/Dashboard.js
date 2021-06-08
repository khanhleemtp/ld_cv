import { makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import CenteredTabs from '../../components/DashboardPage/ListTab';
import { userSelector } from './UserSlice';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(4),
  },
}));

const listItems = [
  {
    label: 'Docs',
    path: '/#resumes',
  },
  {
    label: 'Job',
    path: '/#findsjob',
  },
  {
    label: 'Job App',
    path: '#jobappliaion',
  },
  {
    label: 'Counseling',
    path: '#careercounseling',
  },
];

const Dashboard = () => {
  const { user, errorMessage } = useSelector(userSelector);
  const classes = useStyles();
  return (
    <div>
      <div className={classes.root}>
        <Container maxWidth="sm">
          <Grid container spacing={2} alignItems="center" justify="center">
            <Grid item>
              {errorMessage && (
                <Typography color="error">{errorMessage}</Typography>
              )}
              <Typography variant="h4">
                Welcome to {user?.name ? user.name : 'User'}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1">You have 8 suggession</Typography>
            </Grid>
          </Grid>
        </Container>
      </div>
      <CenteredTabs list={listItems} />

      <Container>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi quis non
        laudantium iure recusandae nisi optio quisquam voluptatibus distinctio
        sed
      </Container>
    </div>
  );
};

export default Dashboard;
