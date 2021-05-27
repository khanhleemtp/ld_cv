import { Box, Grid, makeStyles } from '@material-ui/core';
import PhoneIcon from '@material-ui/icons/Phone';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import LinkIcon from '@material-ui/icons/Link';
import MuiTextField from '../input/MuiTextField';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import ContainerSection from '../section/ContainerSection';
import { useWatch } from 'react-hook-form';

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
    backgroundSize: 'cover  ',
  },
  icon: {
    marginRight: 6,
  },
}));

const Header = ({ control, watch, setValue }) => {
  const imageLink = useWatch({
    control,
    name: 'header.photo',
    // defaultValue: 'user.svg',
  });

  const classes = useStyles();
  return (
    <ContainerSection
      record="header"
      control={control}
      setValue={setValue}
      watch={watch}
    >
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

          {watch('header.showTitle') && (
            <MuiTextField
              typeText="h6"
              record="header"
              control={control}
              nameField="header.title"
              title
              disableUnderline
            />
          )}

          <Grid container alignContent="center" spacing={2} alignItems="center">
            {[
              {
                nameField: 'header.phone',
                watchField: 'header.showPhone',
                icon: <PhoneIcon className={classes.icon} />,
              },
              {
                nameField: 'header.email',
                watchField: 'header.showEmail',
                icon: <AlternateEmailIcon className={classes.icon} />,
              },
              {
                nameField: 'header.location',
                watchField: 'header.showLocation',
                icon: <LocationOnIcon className={classes.icon} />,
              },
              {
                nameField: 'header.link',
                watchField: 'header.showLink',
                icon: <LinkIcon className={classes.icon} />,
              },
            ].map(
              (item, index) =>
                watch(item.watchField) && (
                  <Grid item xs={12} md={4} key={index}>
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
        {watch('header.showPhoto') && (
          <Box
            display="flex"
            alignItems="center"
            alignSelf="flex-start"
            className={classes.avatar}
          >
            <Box
              style={{
                backgroundImage: `url(${imageLink})`,
                borderRadius: '50%',
                width: '150px',
                height: '150px',
                backgroundSize: 'cover',
              }}
            ></Box>
          </Box>
        )}
      </Box>
    </ContainerSection>
  );
};

export default Header;
