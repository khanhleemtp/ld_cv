import { makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import { useForm, Controller } from 'react-hook-form';
import Link from '@material-ui/core/Link';
import { Redirect, useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FormLayout from '../../components/UI/FormLayout';
import { signinUser, userSelector } from '../../features/User/UserSlice';
import { TokenService } from '../../services/TokenService';

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

const SigninPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: '/' } };

  const { control, handleSubmit } = useForm();

  const onSubmit = (data) => {
    dispatch(
      signinUser({
        data,
        cb: () => {
          history.push(from);
        },
      })
    );
  };

  const { isFetching } = useSelector(userSelector);

  const classes = useStyles();

  if (TokenService.getToken()) {
    return <Redirect to="dashboard/info" />;
  }

  return (
    <FormLayout title="Đăng nhập" avatar="🙆‍">
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
                  label="Mật khẩu"
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
                  label="Nhớ mật khẩu ?"
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
            {isFetching ? 'Đang gửi...' : 'Đăng nhập'}
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
              Bạn là người mới? Đăng kí ngay
            </Link>
          </Grid>
        </Grid>
      </form>
    </FormLayout>
  );
};

export default SigninPage;
