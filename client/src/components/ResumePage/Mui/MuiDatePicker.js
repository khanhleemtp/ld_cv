import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { Controller } from 'react-hook-form';
import { Box, makeStyles } from '@material-ui/core';
import moment from 'moment';
import { useResume } from '../../../contexts/useResume';

moment.suppressDeprecationWarnings = true;

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: '12px',
  },
  root: {
    '& .MuiSvgIcon-root': {
      //   fontSize: theme.typography.subtitle2,
      fontSize: '14px',
    },
    '& .MuiFormControl-marginNormal': {
      marginTop: 0,
      marginBottom: 0,
    },
    '& .MuiInputBase-root': {
      width: theme.spacing(12),
      display: 'flex',
      flexDirection: 'row-reverse',
    },
    '& .MuiInputAdornment-positionEnd': {
      marginLeft: -theme.spacing(1),
    },
    '& .MuiInputBase-input': {
      fontSize: '12px',
    },
  },
}));

const MuiDatePicker = ({ label, nameField, title }) => {
  const classes = useStyles();
  const { getValues, register, control } = useResume();
  register(nameField);
  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <Controller
        name={nameField}
        control={control}
        defaultValue={getValues(nameField) || null}
        initialFocusedDate={null}
        render={({ field: { ref, onChange, ...rest } }) => (
          <Box>
            <div className={classes.title}>{title}</div>
            <KeyboardDatePicker
              className={classes.root}
              placeholder="---"
              InputProps={{
                disableUnderline: true,
              }}
              label={label}
              style={{
                marginTop: 0,
                marginBottom: 0,
              }}
              openTo="month"
              margin="normal"
              format="MM/YYYY"
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
              onChange={(d) => onChange(moment(d, 'YYYY/MM').format('YYYY/MM'))}
              views={['month', 'year']}
              invalidDateMessage=""
              {...rest}
            />
          </Box>
        )}
      />
    </MuiPickersUtilsProvider>
  );
};

export default MuiDatePicker;
