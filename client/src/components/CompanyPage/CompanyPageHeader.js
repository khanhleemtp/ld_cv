import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import RoomOutlinedIcon from '@material-ui/icons/RoomOutlined';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import PeopleOutlinedIcon from '@material-ui/icons/PeopleOutlined';
import QueryBuilderOutlinedIcon from '@material-ui/icons/QueryBuilderOutlined';
import LanguageOutlinedIcon from '@material-ui/icons/LanguageOutlined';
import Grid from '@material-ui/core/Grid';
import CompanyTextIcon from './CompanyTextIcon';
import DateRangeOutlinedIcon from '@material-ui/icons/DateRangeOutlined';
import Button from '@material-ui/core/Button';
const useStyles = makeStyles((theme) => ({
  root: {
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(2),
    border: '1px solid #ddd',
    marginBottom: theme.spacing(1),
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
  },
  title: {
    fontSize: 18,
  },
  tag: {
    margin: theme.spacing(0.5),
  },
  main: {
    marginRight: theme.spacing(4),
    marginLeft: theme.spacing(4),
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
      marginRight: theme.spacing(0),
      marginLeft: theme.spacing(0),
    },
  },
  btn: {
    width: theme.spacing(18),
    marginBottom: theme.spacing(1),
  },
}));

const CompanyPageHeader = () => {
  const classes = useStyles();

  return (
    <Paper className={classes.root} variant="outlined">
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        border={1}
        width={150}
        height={150}
        borderColor={'#ddd'}
      >
        <img
          src="/company/fpt.png"
          alt="company"
          style={{
            maxHeight: '150px',
            maxWidth: '150px',
          }}
        />
      </Box>
      <Box
        display="flex"
        // justifyContent="center"
        flexDirection="column"
        // alignItems="space-between"
        flexGrow={1}
        alignSelf="stretch"
        justifyContent="space-around"
        className={classes.main}
      >
        <Typography variant="h4">FPT Software</Typography>
        <Grid container spacing={1}>
          {[
            {
              text: 'Hà Nội, Hồ Chí Minh, Đà Nẵng',
              icon: <RoomOutlinedIcon />,
              col: 12,
            },

            { text: 'Dịch vụ', icon: <SettingsOutlinedIcon />, col: 6 },
            { text: '1000+', icon: <PeopleOutlinedIcon />, col: 6 },
            { text: 'Việt Nam', icon: <LanguageOutlinedIcon />, col: 6 },
            {
              text: 'Thứ 2 - Thứ 6',
              icon: <DateRangeOutlinedIcon />,
              col: 6,
            },
            {
              text: 'Thêm lương OT',
              icon: <QueryBuilderOutlinedIcon />,
              col: 6,
            },
          ].map((item) => (
            <Grid item md={item.col} key={item.text}>
              <CompanyTextIcon
                text={item.text}
                icon={item.icon}
                key={item.text}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        flexDirection="column"
        alignItems="space-between"
      >
        <Button color="secondary" variant="contained" className={classes.btn}>
          Viết review
        </Button>
        <Button variant="contained" className={classes.btn}>
          Theo dõi
        </Button>
      </Box>
    </Paper>
  );
};

export default CompanyPageHeader;
