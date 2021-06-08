import {
  Button,
  Grid,
  makeStyles,
  TextField,
  FormControlLabel,
  FormControl,
  FormHelperText,
  Checkbox,
} from '@material-ui/core';
import { useForm, Controller } from 'react-hook-form';

import Link from '@material-ui/core/Link';
import { useHistory } from 'react-router-dom';
import { clearState, signinUser, userSelector } from './UserSlice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import FormLayout from '../../components/UI/FormLayout';

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

const Signin = () => {
  const history = useHistory();

  const dispatch = useDispatch();

  const { control, handleSubmit } = useForm();

  const onSubmit = (data) => {
    dispatch(signinUser(data));
  };

  const { isFetching, isSuccess, isError, errorMessage, token } =
    useSelector(userSelector);

  useEffect(() => {
    dispatch(clearState());
  }, [dispatch]);

  useEffect(() => {
    if (isSuccess && token) {
      toast.success('Đăng nhập thành công 🚀 ');
      history.push('/dashboard');
      dispatch(clearState());
    }
    if (isError) {
      toast.error('💩' + errorMessage);
      dispatch(clearState());
    }
  }, [isSuccess, isError, errorMessage, history, dispatch, token]);
  const classes = useStyles();
  return (
    <FormLayout title="Sign in" avatar="🙆‍">
      <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
        <Grid container>
          <Grid item xs={12} className={classes.paper}>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  autoFocus
                  className={classes.textField}
                  label="Email"
                  variant="outlined"
                  margin="normal"
                />
              )}
            />
          </Grid>
          <Grid item xs={12} className={classes.paper}>
            <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  className={classes.textField}
                  fullWidth
                  label="Password"
                  variant="outlined"
                  margin="normal"
                  type="password"
                />
              )}
            />
          </Grid>
          <Controller
            name="isAccept"
            control={control}
            defaultValue={false}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <FormControl>
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={(e) => onChange(e.target.checked)}
                      checked={value}
                    />
                  }
                  label="Remember password ?"
                />
                {error && <FormHelperText error>{error}</FormHelperText>}
              </FormControl>
            )}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            disabled={isFetching ? true : false}
            type="submit"
            className={classes.btn}
          >
            {isFetching ? 'Sending...' : 'Login'}
          </Button>
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
      </form>
    </FormLayout>
  );
};

export default Signin;
