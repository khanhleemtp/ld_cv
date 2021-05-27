/* TODO Import */
import { Grid, makeStyles } from '@material-ui/core';
import { Controls } from '../../../components/controls/Controls';
import useForm, { Form } from '../../../hook/useForm';
import Link from '@material-ui/core/Link';
import { useHistory } from 'react-router-dom';
import FormLayout from '../../../components/formLayout/FormLayout';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearState,
  signupUser,
  userSelector,
} from '../../features/User/UserSlice';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

/* TODO Init state */
const initialValues = {
  name: '',
  email: '',
  password: '',
  passwordConfirm: '',
  isAccept: false,
};

/* TODO Style */
const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

const Register = () => {
  /* TODO Fucntion */
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ('name' in fieldValues)
      temp.name = fieldValues.name ? '' : 'This field is required';
    if ('email' in fieldValues)
      temp.email = /^[a-z0-9](\.?[a-z0-9]){5,}@g(oogle)?mail\.com$/.test(
        fieldValues.email
      )
        ? ''
        : 'Email not valid';
    if ('password' in fieldValues)
      temp.password =
        fieldValues.password.length >= 6 ? '' : 'Minium 6 numbers required';
    if ('passwordConfirm' in fieldValues) {
      console.log('confirm', values.passwordConfirm === '');
      temp.passwordConfirm =
        fieldValues.passwordConfirm === values.password &&
        fieldValues.passwordConfirm !== ''
          ? ''
          : 'Password is the same confirm password';
    }
    if ('isAccept' in fieldValues) {
      console.log(fieldValues);
      temp.isAccept =
        fieldValues.isAccept === true ? '' : 'Please accept all privacy';
    }

    setErrors({ ...temp });
    if (fieldValues === values)
      return Object.values(temp).every((x) => x === '');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // alert(JSON.stringify(values));
      dispatch(signupUser(values));
    }
  };

  /* TODO Hook */
  const history = useHistory();
  const dispatch = useDispatch();
  const { isFetching, isSuccess, isError, errorMessage } =
    useSelector(userSelector);

  /* TODO Side effect */
  useEffect(() => {
    dispatch(clearState());
  }, [dispatch]);

  useEffect(() => {
    if (isSuccess) {
      toast.success('Register successfully 🚀');
      history.push('/');
      dispatch(clearState());
    }
    if (isError) {
      toast.error('💩' + errorMessage);
      dispatch(clearState());
    }
  }, [isSuccess, isError, errorMessage, history, dispatch]);

  const { values, handleInputChange, errors, setErrors } = useForm(
    initialValues,
    true,
    validate
  );
  const classes = useStyles();

  /* TODO UI*/
  return (
    <FormLayout title="Sign up" avatar="🙆‍♂️">
      <Form onSubmit={handleSubmit}>
        <Grid container>
          <Grid item xs={12} className={classes.paper}>
            <Controls.Input
              label="Name"
              name="name"
              fullWidth
              autoFocus
              value={values.name}
              error={errors.name}
              onChange={handleInputChange}
            />
            <Controls.Input
              fullWidth
              label="Email"
              value={values.email}
              name="email"
              onChange={handleInputChange}
              error={errors.email}
            />
            <Controls.Input
              fullWidth
              label="Password"
              name="password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={values.password}
              onChange={handleInputChange}
              error={errors.password}
            />
            <Controls.Input
              fullWidth
              label="Password Confirm"
              name="passwordConfirm"
              id="passwordConfirm"
              autoComplete="current-password"
              type="password"
              value={values.passwordConfirm}
              onChange={handleInputChange}
              error={errors.passwordConfirm}
            />
          </Grid>
          <Grid item xs={12}>
            <Controls.Checkbox
              fullWidth
              name="isAccept"
              label="Please accept all privacy*"
              value={values.isAccept}
              onChange={handleInputChange}
              error={errors.isAccept}
            />
          </Grid>
          <Controls.Button
            variant="contained"
            color="primary"
            fullWidth
            text={isFetching ? 'Sending..' : 'Submit'}
            type="submit"
            disabled={isFetching ? true : false}
          />
        </Grid>
        <Grid container justify="flex-end">
          <Grid item>
            <Link
              component="button"
              variant="body2"
              onClick={() => {
                history.push('/signin');
              }}
            >
              Already have an account? Log in
            </Link>
          </Grid>
        </Grid>
      </Form>
    </FormLayout>
  );
};

export default Register;
