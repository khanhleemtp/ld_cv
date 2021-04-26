import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
const convertToDefEventPara = (name, value) => ({
  target: {
    name,
    value,
  },
});
const DatePicker = (props) => {
  const { name, label, value, onChange } = props;
  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <KeyboardDatePicker
        name={name}
        label={label}
        value={value}
        disableToolbar
        variant="inline"
        inputVariant="outlined"
        format="DD/MM/YYYY"
        onChange={(date) => {
          onChange(convertToDefEventPara(name, date));
        }}
        autoOk
      />
    </MuiPickersUtilsProvider>
  );
};

export default DatePicker;
