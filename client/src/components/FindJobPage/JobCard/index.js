import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import moment from 'moment';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 8,
    border: '1px solid #ddd',
    '&:hover': {
      boxShadow: `0 3px 4px 0 rgba(0,0,0,.4)`,
    },
    marginBottom: theme.spacing(1),
    borderLeft: '4px solid',
    borderLeftColor: '#ec407a',
    maxWidth: theme.spacing(64),
  },
  title: {
    fontSize: 18,
  },
  tag: {
    margin: theme.spacing(0.5),
    textTransform: 'capitalize',
  },
  salary: {
    textTransform: 'capitalize',
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
}));

const JobCard = ({ item, photo, companyName }) => {
  const classes = useStyles();
  const history = useHistory();
  const handleDetailsJob = () => {
    // console.log('click');
    history.push('/jobs/' + item?.id);
  };
  return (
    <Paper
      className={classes.root}
      variant="outlined"
      onClick={handleDetailsJob}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        marginLeft={3}
        border={1}
        height={70}
        width={70}
        borderColor={'#ddd'}
        flexDirection="column"
      >
        <img
          src={photo}
          alt="company"
          style={{
            maxHeight: '65px',
            maxWidth: '65px',
          }}
        />
        <Typography variant="subtitle2" align="center">
          {companyName?.toUpperCase()}
        </Typography>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        flexDirection="column"
        alignItems="space-between"
        flexGrow={1}
        marginLeft={2}
      >
        <Typography variant="h6" component="p">
          {item?.title}
        </Typography>
        {item?.status && (
          <Typography variant="body2" component="p">
            Độ phù hợp : {item?.status}
          </Typography>
        )}
        <Typography variant="body2" color="primary" className={classes.salary}>
          💸 {item?.position}-{item?.salary}
        </Typography>
        <Box flexBasis={1}>
          {item?.tags.map((item) => (
            <Chip label={item} key={item} clickable className={classes.tag} />
          ))}
        </Box>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        flexDirection="column"
        alignItems="space-between"
      >
        <Typography variant="subtitle2">{item?.location || '__'}</Typography>
        <Typography variant="subtitle2">
          {moment().diff(item?.createdAt, 'hour')} giờ trước
        </Typography>
      </Box>
    </Paper>
  );
};

export default JobCard;
