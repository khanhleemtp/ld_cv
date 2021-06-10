import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import HomeCompanyCard from './HomeCompanyCard';

const useStyles = makeStyles((theme) => ({
  companyItem: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
    },
  },
}));
const HomeCompanyList = () => {
  const classes = useStyles();

  return (
    <Container maxWidth="lg">
      <Box marginY={4}>
        <Typography variant="h4">Nhà tuyển dụng hàng đầu</Typography>
      </Box>
      <Grid container spacing={2}>
        {[
          {
            id: 1,
            photo: 'company/fpt.png',
            company: 'FPT',
            location: 'Ho Chi Minh',
            totalJob: 5,
          },
          {
            photo: 'company/samsung.png',
            id: 2,
            company: 'Samsung',
            location: 'Ho Chi Minh',
            totalJob: 5,
          },
          {
            photo: 'company/fpt.png',
            id: 3,
            company: 'FPT',
            location: 'Ho Chi Minh',
            totalJob: 5,
          },
          {
            photo: 'company/samsung.png',
            id: 4,
            company: 'FPT',
            location: 'Ho Chi Minh',
            totalJob: 5,
          },
          {
            photo: 'company/fpt.png',
            id: 5,
            company: 'FPT',
            location: 'Ho Chi Minh',
            totalJob: 5,
          },
          {
            photo: 'company/samsung.png',
            id: 6,
            company: 'FPT',
            location: 'Ho Chi Minh',
            totalJob: 5,
          },
          {
            photo: 'company/fpt.png',
            id: 7,
            company: 'FPT',
            location: 'Ho Chi Minh',
            totalJob: 5,
          },
          {
            photo: 'company/samsung.png',
            id: 8,
            company: 'FPT',
            location: 'Ho Chi Minh',
            totalJob: 5,
          },
        ].map((item) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={3}
            className={classes.companyItem}
            key={item.id}
          >
            <HomeCompanyCard
              photo={item.photo}
              totalJob={item.totalJob || 0}
              location={item.location}
              company={item.company}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default HomeCompanyList;
