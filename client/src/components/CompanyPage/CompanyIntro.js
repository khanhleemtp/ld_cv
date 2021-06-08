import { Typography, Box, Paper, Chip, makeStyles } from '@material-ui/core';
import React from 'react';
const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
  },

  tag: {
    margin: theme.spacing(0.5),
  },
}));
const CompanyIntro = () => {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Box>
        <Typography variant="h5" gutterBottom={true}>
          Giới thiệu về công ty FPT Software
        </Typography>
        <Typography variant="h6" gutterBottom={true}>
          The leading provider of software outsourcing services in Vietnam
        </Typography>
        <Typography variant="body1">
          “ FPT Software is part of FPT Corporation (FPT – HoSE) – the global
          leading technology, outsourcing and IT services group headquartered in
          Vietnam with nearly US$2 billion in revenue and more than 13,000
          employees. Qualified with CMMI Level 5 & ISO 27001:2013, ASPICE LEVEL
          3, FPT Software delivers world-class services in Smart factory,
          Digital platform, RPA, AI, IoT, Enterprise Mobilization, Cloud, AR/VR,
          Embedded System, Managed service, Testing, Platform modernization,
          Business Applications, Application Service, BPO and more services
          globally from delivery centers across the United States, Japan,
          Europe, Korea, China, Australia, Vietnam and the Asia Pacific.
        </Typography>
      </Box>
      <Box marginY={4}>
        <Typography variant="h5">Chuyên môn của chúng tôi</Typography>
        <Box flexBasis={1} marginY={2}>
          {[1, 2, 3].map((item) => (
            <Chip label="Basic" key={item} clickable className={classes.tag} />
          ))}
        </Box>
      </Box>
    </Paper>
  );
};

export default CompanyIntro;
