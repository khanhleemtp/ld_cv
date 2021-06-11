/* TODO Import */
import { makeStyles } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import FormLayout from '../../components/UI/FormLayout';
import { userSelector, signupUser } from '../../features/User/UserSlice';
import { useHistory, useLocation } from 'react-router-dom';
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

const SignupPage = () => {
  const loginSchema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
    passwordConfirm: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Mật khẩu không khớp ☺️')
      .required(),
    isAccept: yup
      .bool()
      .oneOf([true], 'Bạn cần chấp nhận mọi điều khoanar của chúng tôi 😗'),
  });

  /* TODO Hook */
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: '/' } };

  const { isFetching } = useSelector(userSelector);
  const { handleSubmit, control } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = (data) => {
    dispatch(
      signupUser({
        data,
        cb: () => {
          history.push(from);
        },
      })
    );
  };

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

export default SignupPage;
