import { Typography, Grid, Button, Box, Container } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
  btn: {
    justifySelf: 'end',
    marginTop: 12,
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
      background: theme.palette.primary.dark,
    },
  },
  sectionImg: {
    width: 360,
  },
  img: {
    width: '100%',
  },
  container: {
    marginBottom: theme.spacing(1),
  },
}));
const HomeSection = ({ id, title, body, textBtn, img }) => {
  const classes = useStyles();
  const history = useHistory();
  return (
    <Container className={classes.container} maxWidth="md">
      <Grid
        container
        spacing={2}
        alignItems="center"
        direction={id % 2 === 0 ? 'row-reverse' : 'row'}
      >
        <Grid item xs={12} md={6}>
          <Box className={classes.sectionImg}>
            <img src={img} alt="img" className={classes.img} />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h4">{title}</Typography>
          <Typography>{body}</Typography>
          <Button
            className={classes.btn}
            onClick={() => {
              history.push({
                pathname: '/dashboard/cv',
              });
            }}
          >
            {textBtn}
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default HomeSection;
