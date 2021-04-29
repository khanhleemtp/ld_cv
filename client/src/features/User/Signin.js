import { Grid, makeStyles } from '@material-ui/core';
import { Controls } from '../../components/controls/Controls';
import useForm, { Form } from '../../hook/useForm';

import Link from '@material-ui/core/Link';
import { useHistory } from 'react-router-dom';
import FormLayout from '../../components/formLayout/FormLayout';
import { clearState, signinUser, userSelector } from './UserSlice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const initialValues = {
  email: '',
  password: '',
  isAccept: false,
};

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

const Signin = () => {
  const history = useHistory();

  const dispatch = useDispatch();

  const { values, handleInputChange } = useForm(initialValues);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signinUser(values));
  };

  const { isFetching, isSuccess, isError, errorMessage } = useSelector(
    userSelector
  );
  useEffect(() => {
    dispatch(clearState());
  }, [dispatch]);

  useEffect(() => {
    if (isSuccess) {
      toast.success('Login successfully 🚀 ');
      history.push('/dashboard');
      dispatch(clearState());
    }
    if (isError) {
      toast.error('💩' + errorMessage);
      dispatch(clearState());
    }
  }, [isSuccess, isError, errorMessage, history, dispatch]);
  const classes = useStyles();
  return (
    <FormLayout title="Sign in" avatar="🙆‍">
      <Form onSubmit={handleSubmit}>
        <Grid container>
          <Grid item xs={12} className={classes.paper}>
            <Controls.Input
              fullWidth
              autoFocus
              label="Email"
              value={values.email}
              name="email"
              onChange={handleInputChange}
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
            />
          </Grid>
          <Grid item xs={12}>
            <Controls.Checkbox
              fullWidth
              name="isAccept"
              label="Remember password *"
              value={values.isAccept}
              onChange={handleInputChange}
            />
          </Grid>
          <Controls.Button
            variant="contained"
            color="primary"
            fullWidth
            text={isFetching ? 'Sending...' : 'Submit'}
            disabled={isFetching ? true : false}
            type="submit"
          />
        </Grid>
        <Grid container justify="flex-end">
          <Grid item>
            <Link
              component="button"
              variant="body2"
              onClick={() => {
                history.push('/signup');
              }}
            >
              You have new user? Signup
            </Link>
          </Grid>
        </Grid>
      </Form>
    </FormLayout>
  );
};

export default Signin;
