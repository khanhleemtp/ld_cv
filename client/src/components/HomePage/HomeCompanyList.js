import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import HomeCompanyCard from './HomeCompanyCard';
import {
  companySelector,
  getTopCompany,
} from '../../features/Company/CompanySlice';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
  companyItem: {
    display: 'flex',
    cursor: 'pointer',
    flexDirection: 'column',
    justifyContent: 'center',
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
    },
  },
}));
const HomeCompanyList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch(getTopCompany());
  }, [dispatch]);
  const { topCom } = useSelector(companySelector);
  const handleGoCompany = (id) => () => {
    history.push('/company/' + id);
  };
  return (
    <Container maxWidth="lg">
      <Box marginY={4}>
        <Typography variant="h4">Nhà tuyển dụng hàng đầu</Typography>
      </Box>
      <Grid container spacing={2}>
        {topCom?.map((item) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={3}
            className={classes.companyItem}
            key={item.id}
            onClick={handleGoCompany(item.id)}
          >
            <HomeCompanyCard
              photo={item.photo}
              location={item.location}
              company={item.name}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default HomeCompanyList;
