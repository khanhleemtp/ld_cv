import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles((theme) => ({
  root: {
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    border: '1px solid #ddd',
    '&:hover': {
      boxShadow: `0 3px 4px 0 rgba(0,0,0,.4)`,
    },
    marginBottom: theme.spacing(1),

    borderLeft: '4px solid',
    borderLeftColor: '#ec407a',
    // [theme.breakpoints.up('md')]: {
    // },
  },
  title: {
    fontSize: 18,
  },
  tag: {
    margin: theme.spacing(0.5),
  },
  salary: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
}));

const JobCard = ({ item, photo }) => {
  const classes = useStyles();
  return (
    <Paper className={classes.root} variant="outlined">
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        marginLeft={3}
        border={1}
        height={70}
        width={70}
        borderColor={'#ddd'}
      >
        <img
          src={photo}
          alt="company"
          style={{
            maxHeight: '65px',
            maxWidth: '65px',
          }}
        />
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        flexDirection="column"
        alignItems="space-between"
      >
        <Typography variant="h6" component="p">
          {item?.title}
        </Typography>
        <Typography variant="body2" color="primary" className={classes.salary}>
          💸 {item?.salary}
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
        {/* <Chip label="Hot" clickable color="primary" /> */}
        <Typography variant="subtitle2">Ho Chi Minh</Typography>
        <Typography variant="subtitle2">1 ngày trước</Typography>
      </Box>
    </Paper>
  );
};

export default JobCard;
