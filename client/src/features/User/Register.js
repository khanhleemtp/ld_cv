import { Container, Grid, makeStyles } from '@material-ui/core';
import { Controls } from '../../components/controls/Controls';
import useForm, { Form } from '../../hook/useForm';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Link from '@material-ui/core/Link';
import { useHistory } from 'react-router-dom';

const initialValues = {
  name: '',
  email: '',
  password: '',
  passwordConfirm: '',
  isAccept: false,
};

const useStyles = makeStyles((theme) => ({
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.avatar,
  },
  paperContent: {
    margin: theme.spacing(2),
    padding: theme.spacing(4, 2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

const Register = () => {
  const history = useHistory();

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

  const { values, handleInputChange, errors, setErrors } = useForm(
    initialValues,
    true,
    validate
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert(JSON.stringify(values));
    }
  };

  const classes = useStyles();
  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paperContent}>
        <Avatar className={classes.avatar}>🙆‍♂️</Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Form onSubmit={handleSubmit}>
          <Grid container>
            <Grid item xs={12} md={12} className={classes.paper}>
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
              text="Submit"
              type="submit"
            />
          </Grid>
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
        </Form>
      </Paper>
    </Container>
  );
};

export default Register;
