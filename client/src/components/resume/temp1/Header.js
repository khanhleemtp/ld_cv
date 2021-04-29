import {
  Box,
  Grid,
  Typography,
  TextField,
  makeStyles,
} from '@material-ui/core';
import React from 'react';
import PhoneIcon from '@material-ui/icons/Phone';
import headerData from './Header.json';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import LinkIcon from '@material-ui/icons/Link';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import InputUser from './InputUser';

const useStyles = makeStyles((theme) => ({
  root: {
    '&:hover': {
      //   border: `2px solid ${theme.palette.info.main}`,
      background: theme.palette.grey[100],
    },
    padding: 10,
    cursor: 'pointer',
  },
  avatar: {
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  insideAvatar: {
    borderRadius: '50%',
    width: '150px',
    height: '150px',
    backgroundSize: 'cover  ',
  },
}));

// "header":{
//     "record":"Header",
//     "name":"LD KHANH",
//     "title":"15 years of performance-driven IT management in global manufacturing companies.",
//     "email":"khanhleemtp@gmail",
//     "location":"Ha Noi",
//     "phone":"+1-779-116-5544",
//     "link":"angel.co/__NAME__",
//     "height":211,
//     "showTitle":true,
//     "showPhone":true,
//     "showLink":true,
//     "showEmail":true,
//     "showLocation":true,
//     "uppercaseName":true,
//     "showPhoto":true,
//     "photoStyle":"round",
//     "photo":"https://enhancv.s3.amazonaws.com/avatars/f98cf36c9d793936cbfc5d6f63aac9cbf71c89f9975e2678794c23e1020ac1db.jpg"
//  },
console.log(headerData);
const Header = () => {
  const classes = useStyles();
  return (
    <Box display="flex" justifyContent="center" className={classes.root}>
      <Box>
        <InputUser defaultValue={headerData.header.name} typeText="h4" />
        <InputUser defaultValue={headerData.header.title} typeText="h6" />
        <Grid container alignContent="center" spacing={2} alignItems="center">
          <Grid item xs={12} sm={4}>
            <InputUser
              defaultValue={headerData.header.phone}
              icon={<PhoneIcon />}
              typeText="body1"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <InputUser
              defaultValue={headerData.header.email}
              icon={<AlternateEmailIcon />}
              typeText="body1"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <InputUser
              defaultValue={headerData.header.location}
              icon={<LinkIcon />}
              typeText="body1"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <InputUser
              defaultValue={headerData.header.link}
              icon={<LinkIcon />}
              typeText="body1"
            />
          </Grid>
        </Grid>
      </Box>
      <Box
        display="flex"
        alignItems="center"
        alignSelf="flex-start"
        className={classes.avatar}
      >
        <Box
          style={{
            backgroundImage: `url(${headerData.header.photo})`,
            borderRadius: '50%',
            width: '150px',
            height: '150px',
            backgroundSize: 'cover  ',
          }}
        ></Box>
      </Box>
    </Box>
  );
};

export default Header;
