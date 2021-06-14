import { Typography, Box, Chip, makeStyles } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { companySelector } from '../../features/Company/CompanySlice';
const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
  },
  tag: {
    margin: theme.spacing(0.5),
  },
}));
const CompanyIntro = () => {
  const classes = useStyles();
  const { company } = useSelector(companySelector);

  return (
    <>
      <Box>
        <Typography variant="h5" gutterBottom={true}>
          Giới thiệu về công ty {company?.name?.toLocaleUpperCase()}
        </Typography>
        <Typography variant="h6" gutterBottom={true}>
          {company?.intro}
        </Typography>
        <Box paddingLeft={4} marginY={2}>
          <Typography variant="subtitle1" gutterBottom={true}>
            {company?.details}
          </Typography>
        </Box>
      </Box>
      <Box marginY={4}>
        <Typography variant="h6">Chuyên môn của chúng tôi</Typography>
        <Box flexBasis={1} marginY={2}>
          {company?.tag?.map((item) => (
            <Chip label={item} key={item} clickable className={classes.tag} />
          ))}
        </Box>
      </Box>
    </>
  );
};

export default CompanyIntro;
