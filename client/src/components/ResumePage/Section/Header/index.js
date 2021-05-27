import React from 'react';
import ResumeSectionLayout from '../Layout/ResumeSectionLayout';
import { Box, Grid, makeStyles } from '@material-ui/core';
import PhoneIcon from '@material-ui/icons/Phone';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import LinkIcon from '@material-ui/icons/Link';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { useWatch } from 'react-hook-form';
import { useResume } from '../../../../contexts/useResume';
import MuiTextField from '../../Mui/MuiTextField';
import HeaderSetting from '../../Setting/HeaderSetting';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    padding: 12,
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
    backgroundSize: 'cover',
  },
  icon: {
    marginRight: 6,
  },
}));

const ResumeSectionHeader = () => {
  const { control } = useResume();

  const watchObj = useWatch({
    control,
    name: 'header',
  });

  const {
    showPhoto,
    showLink,
    showTitle,
    showPhone,
    showLocation,
    showEmail,
    photo,
  } = watchObj;

  const classes = useStyles();

  return (
    <ResumeSectionLayout settingComponent={<HeaderSetting />} record="header">
      <Box className={classes.root}>
        <Box
          style={{
            flexGrow: 1,
          }}
        >
          <MuiTextField
            typeText="h4"
            record="header"
            name
            control={control}
            nameField="header.name"
            disableUnderline
          />

          {showTitle && (
            <MuiTextField
              typeText="h6"
              record="header"
              control={control}
              nameField="header.title"
              title
              blueTitle
              disableUnderline
            />
          )}

          <Grid container alignContent="center" spacing={2} alignItems="center">
            {[
              {
                nameField: 'header.phone',
                watchField: showPhone,
                icon: <PhoneIcon className={classes.icon} />,
              },
              {
                nameField: 'header.email',
                watchField: showEmail,
                icon: <AlternateEmailIcon className={classes.icon} />,
              },
              {
                nameField: 'header.location',
                watchField: showLocation,
                icon: <LocationOnIcon className={classes.icon} />,
              },
              {
                nameField: 'header.link',
                watchField: showLink,
                icon: <LinkIcon className={classes.icon} />,
              },
            ].map(
              (item, index) =>
                item.watchField && (
                  <Grid item xs={12} md={6} key={index}>
                    <MuiTextField
                      control={control}
                      icon={item.icon}
                      typeText="subtitle2"
                      nameField={item.nameField}
                      record="header"
                      description
                      disableUnderline
                    />
                  </Grid>
                )
            )}
          </Grid>
        </Box>
        {showPhoto && (
          <Box
            display="flex"
            alignItems="center"
            alignSelf="flex-start"
            className={classes.avatar}
          >
            <Box
              style={{
                backgroundImage: `url(${photo})`,
                borderRadius: '50%',
                width: '150px',
                height: '150px',
                backgroundSize: 'cover',
              }}
            ></Box>
          </Box>
        )}
      </Box>
    </ResumeSectionLayout>
  );
};

export default ResumeSectionHeader;
