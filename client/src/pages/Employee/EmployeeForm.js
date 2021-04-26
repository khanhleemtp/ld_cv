import { Grid, makeStyles } from '@material-ui/core';
import { Controls } from '../../components/controls/Controls';
import useForm, { Form } from '../../hook/useForm';
import * as employeeService from '../../services/employeeService';

const initialValues = {
  id: 0,
  fullName: '',
  email: '',
  mobile: '',
  city: '',
  gender: 'male',
  departmentId: '',
  hireDate: new Date(),
  isPermanent: false,
};

const genderItems = [
  { id: 'male', title: 'Male' },
  { id: 'female', title: 'Female' },
  { id: 'other', title: 'Other' },
];

const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  root: {
    '& .MuiFormControl-root': {
      width: '80%',
      margin: theme.spacing(1),
    },
  },
}));
const EmployeeForm = () => {
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ('fullName' in fieldValues)
      temp.fullName = fieldValues.fullName ? '' : 'This field is required';
    if ('email' in fieldValues)
      temp.email = /$^|.+@.+..+/.test(fieldValues.email)
        ? ''
        : 'Email not valid';
    if ('mobile' in fieldValues)
      temp.mobile =
        fieldValues.mobile.length > 9 ? '' : 'Minium 10 numbers required';
    if ('departmentId' in fieldValues)
      temp.departmentId =
        fieldValues.departmentId.length !== 0 ? '' : 'This field is required';
    setErrors({ ...temp });
    if (fieldValues === values)
      return Object.values(temp).every((x) => x === '');
  };

  const { values, handleInputChange, errors, setErrors, resetForm } = useForm(
    initialValues,
    true,
    validate
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
    }
  };

  const classes = useStyles();
  return (
    <>
      <div className={classes.toolbar}></div>
      <Form onSubmit={handleSubmit}>
        <Grid container>
          <Grid item xs={12} md={6}>
            <Controls.Input
              label="Email"
              value={values.email}
              name="email"
              onChange={handleInputChange}
            />
            <Controls.Input
              label="Full name"
              name="fullName"
              value={values.fullName}
              error={errors.fullName}
              onChange={handleInputChange}
            />
            <Controls.Input
              label="Mobile"
              name="mobile"
              value={values.mobile}
              onChange={handleInputChange}
              error={errors.mobile}
            />
            <Controls.Input
              label="City"
              name="city"
              value={values.city}
              onChange={handleInputChange}
              error={errors.city}
            />
          </Grid>
          <Grid item xs={6}>
            <Controls.RadioGroup
              items={genderItems}
              label="Gender"
              name="gender"
              onChange={handleInputChange}
              value={values.gender}
            />
            <Controls.Select
              name="departmentId"
              label="Department"
              options={employeeService.getDepartmentCollection()}
              value={values.departmentId}
              onChange={handleInputChange}
              error={errors.departmentId}
            />
            <Controls.Checkbox
              name="isPermanent"
              label="Permanent Employee"
              value={values.isPermanent}
              onChange={handleInputChange}
            />
            <Controls.DatePicker
              name="hireDate"
              label="Hire Date"
              value={values.hireDate}
              onChange={handleInputChange}
            />
            <Controls.Button
              variant="contained"
              color="primary"
              size="large"
              text="Submit"
              type="submit"
            />
            <Controls.Button
              variant="contained"
              color="default"
              size="large"
              text="Reset"
              type="reset"
              onClick={resetForm}
            />
          </Grid>
        </Grid>
      </Form>
    </>
  );
};

export default EmployeeForm;
