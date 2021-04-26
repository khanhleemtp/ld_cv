import React, { useState, useEffect } from 'react';
/* TODO Import */
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/* TODO Redux */
import { useSelector, useDispatch } from 'react-redux';
import { signupUser, userSelector, clearState } from './UserSlice';
import { useHistory } from 'react-router-dom';

/* TODO Style */
const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing(2),
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#edf',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  inputField: {
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
      color: '#111',
    },
    '& .MuiFormLabel-root.Mui-error': {
      color: '#827d83',
    },
  },
}));

export default function SignUp() {
  /* TODO Define state */
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  /* TODO Hook */
  const dispatch = useDispatch();
  const history = useHistory();
  const { isFetching, isSuccess, isError, errorMessage } = useSelector(
    userSelector
  );
  const classes = useStyles(isFetching);

  /* TODO Effect */
  useEffect(() => {
    return () => {
      dispatch(clearState());
    };
  }, [dispatch]);

  useEffect(() => {
    if (isSuccess) {
      console.log('run success');
      toast.success('Register success');
      dispatch(clearState());
      history.push('/');
    }

    if (isError) {
      console.log('run err');
      console.log(toast);
      toast.error(errorMessage);
      dispatch(clearState());
    }
  }, [isSuccess, isError, history, errorMessage, dispatch]);

  /* TODO Function */
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signupUser(values));
  };

  const handleChange = (name) => (e) => {
    setValues({ ...values, [name]: e.target.value });
  };

  /* TODO UI */
  return (
    <Container
      component="main"
      maxWidth="xs"
      style={{ display: 'flex', alignItems: 'center' }}
    >
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>🙆‍♂️</Avatar>

        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form
          noValidate
          className={classes.form}
          onSubmit={handleSubmit}
          autoComplete="off"
          style={{
            width: '80%',
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                autoComplete="off"
                name="name"
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Name"
                autoFocus
                value={values.name}
                onChange={handleChange('name')}
                error={values.name === '' ? true : false}
                helperText={values.name !== '' ? '' : 'Required'}
                InputProps={{
                  classes: {
                    root: classes.notchedOutline,
                    focused: classes.notchedOutline,
                    notchedOutline: classes.notchedOutline,
                  },
                }}
                className={classes.inputField}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="off"
                value={values.email}
                onChange={handleChange('email')}
                error={values.email === '' ? true : false}
                helperText={values.email !== '' ? '' : 'Required!'}
                className={classes.inputField}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                value={values.password}
                onChange={handleChange('password')}
                error={values.password === '' ? true : false}
                helperText={values.password !== '' ? '' : 'Required!'}
                className={classes.inputField}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                autoComplete="new-password"
                value={values.confirmPassword}
                onChange={handleChange('confirmPassword')}
                error={
                  values.password === '' ||
                  values.password !== values.confirmPassword
                    ? true
                    : false
                }
                helperText={
                  values.confirmPassword !== '' &&
                  values.confirmPassword === values.password
                    ? ''
                    : values.confirmPassword !== values.password
                    ? 'Password must be same confirm password'
                    : 'Required'
                }
                className={classes.inputField}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I agree to Terms of Serviceand Privacy policy"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link
                component="button"
                variant="body2"
                onClick={() => {
                  history.push('/login');
                }}
              >
                Already have an account? Log in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
