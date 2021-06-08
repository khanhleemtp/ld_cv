/* TODO Import */
import { Grid, makeStyles } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearState, signupUser, userSelector } from './UserSlice';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import {
  TextField,
  Checkbox,
  Button,
  FormControl,
  FormHelperText,
  FormControlLabel,
} from '@material-ui/core';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import FormLayout from '../../components/UI/FormLayout';
/* TODO Init state */

/* TODO Style */
const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  textField: {
    '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.primary.header,
    },
    '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.primary.header,
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.primary.app,
    },
    '& .Mui-focused': {
      color: theme.palette.grey.A700,
    },
    '& .Mui-error': {
      color: theme.palette.error.main,
    },
  },
  btn: {
    marginTop: 12,
    marginBottom: 12,
  },
}));

const Register = () => {
  const onSubmit = (data) => {
    dispatch(signupUser(data));
  };

  const loginSchema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
    passwordConfirm: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords must match')
      .required(),
    isAccept: yup.bool().oneOf([true], 'You should accept all privacy'),
  });

  /* TODO Hook */
  const history = useHistory();
  const dispatch = useDispatch();
  const { isFetching, isSuccess, isError, errorMessage, token } =
    useSelector(userSelector);
  const { handleSubmit, control } = useForm({
    resolver: yupResolver(loginSchema),
  });

  /* TODO Side effect */
  useEffect(() => {
    dispatch(clearState());
  }, [dispatch]);

  useEffect(() => {
    if (isSuccess) {
      toast.success('Đăng ký thành công 🚀');
      history.push('/');
      dispatch(clearState());
    }
    if (isError & errorMessage) {
      toast.error('💩' + errorMessage);
      dispatch(clearState());
    }
  }, [isSuccess, isError, errorMessage, history, dispatch, token]);

  const classes = useStyles();

  /* TODO UI*/
  return (
    <FormLayout title="Sign up" avatar="🙆‍♂️">
      <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
        <Grid container>
          <Grid item xs={12}>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  className={classes.textField}
                  label="Name"
                  variant="outlined"
                  fullWidth
                  autoFocus
                  error={!!error}
                  helperText={error ? error.message : null}
                  margin="normal"
                />
              )}
            />
            <Controller
              name="email"
              control={control}
              defaultValue=""
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  className={classes.textField}
                  label="Email"
                  variant="outlined"
                  fullWidth
                  error={!!error}
                  helperText={error ? error.message : null}
                  margin="normal"
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  className={classes.textField}
                  label="Password"
                  variant="outlined"
                  fullWidth
                  error={!!error}
                  helperText={error ? error.message : null}
                  type="password"
                  margin="normal"
                />
              )}
            />
            <Controller
              name="passwordConfirm"
              control={control}
              defaultValue=""
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  className={classes.textField}
                  label="PasswordConfirm"
                  variant="outlined"
                  fullWidth
                  error={!!error}
                  helperText={error ? error.message : null}
                  type="password"
                  margin="normal"
                />
              )}
            />
            <Controller
              name="isAccept"
              control={control}
              defaultValue={false}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <FormControl>
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={(e) => onChange(e.target.checked)}
                        checked={value}
                      />
                    }
                    label="Please accept all privacy*"
                  />
                  {error && (
                    <FormHelperText error>
                      {JSON.stringify(error.message)}
                    </FormHelperText>
                  )}
                </FormControl>
              )}
            />
          </Grid>

          <Button
            variant="contained"
            color="primary"
            fullWidth
            disabled={isFetching ? true : false}
            type="submit"
            className={classes.btn}
          >
            {isFetching ? 'Sending...' : 'Signup'}
          </Button>
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
      </form>
    </FormLayout>
  );
};

export default Register;
