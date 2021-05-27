import { Typography, Grid, Button, Box, Container } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
const SectionHome = ({ id }) => {
  const classes = useStyles();
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
            <img src="r1.png" alt="img" className={classes.img} />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h4">
            Eliminate costly mistakes with a single switch
          </Typography>
          <Typography>
            With our content analyzer tool, you won’t let mistakes or typos cost
            you the job. You’ll also cut out cliches, repetition, vague wording,
            and phrases that are not performance-oriented.
          </Typography>
          <Button className={classes.btn}>View all resumes</Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SectionHome;
