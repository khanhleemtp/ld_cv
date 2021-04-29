/* TODO  import */
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { Suspense } from 'react';
import { lazy } from '@loadable/component';
import pMinDelay from 'p-min-delay';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { blue, pink } from '@material-ui/core/colors';
import Loading from './components/Loading';
import Layout from './components/Layout';
import { ToastContainer } from 'react-toastify';
import Employees from './pages/Employee/Employees';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './hoc/PrivateRoute';
import Dashboard from './features/User/Dashboard';
import { TokenService } from './services/TokenService';
import Resume from './features/resume/Resume';
import PublicRoute from './helpers/PublicRoute';

/* TODO Lazy */
const Home = lazy(() => pMinDelay(import('./components/Home'), 500));
const Signin = lazy(() => pMinDelay(import('./features/User/Signin'), 500));
const Register = lazy(() => pMinDelay(import('./features/User/Register'), 500));

/* TODO  Styles  */
const theme = createMuiTheme({
  overrides: {
    MuiButton: {
      root: {
        fontSize: '1rem',
      },
    },
    MuiAppBar: {
      root: {
        transform: 'translateZ(0)',
      },
    },
  },

  props: {
    MuiButton: {
      // disableRipple: true,
    },
  },

  palette: {
    primary: {
      main: pink[400],
      app: blue[200],
      header: '#e2e4ea',
      avatar: '#edf',
    },
    secondary: {
      main: pink[600],
    },
  },

  typography: {
    fontFamily: 'Quicksand',
    fontWeightLight: 400,
    fontWeightMedium: 600,
    fontWeightRegular: 500,
    fontWeightBold: 700,
  },
});

// TODO

function App() {
  console.log(process.env.REACT_APP_API_URL);

  /* TODO  UI */
  return (
    <ThemeProvider theme={theme}>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Suspense fallback={<Loading />}>
        <Router>
          <Layout>
            <Switch>
              <Route exact path="/" children={<Home />} />
              <Route path="/test" children={<Employees />} />
              <Route path="/resume">
                <Resume />
              </Route>
              <PublicRoute
                component={<Register />}
                path="/signup"
                redirect="/dashboard"
              />
              <PublicRoute
                component={Signin}
                path="/signin"
                redirect="/dashboard"
              />
              <PrivateRoute component={Dashboard} path="/dashboard" />
            </Switch>
          </Layout>
        </Router>
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
