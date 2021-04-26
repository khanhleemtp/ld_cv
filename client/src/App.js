/* TODO  import */
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Suspense } from 'react';
import { lazy } from '@loadable/component';
import pMinDelay from 'p-min-delay';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { blue, pink } from '@material-ui/core/colors';
import Loading from './components/Loading';
import Layout from './components/Layout';
import { ToastContainer } from 'react-toastify';
import Employees from './pages/Employee./Employees';
import Register from './features/User/Register';

/* TODO Lazy */
const Signup = lazy(() => pMinDelay(import('./features/User/Signup'), 1000));
const Login = lazy(() => pMinDelay(import('./features/User/Login'), 0));
const Home = lazy(() => pMinDelay(import('./components/Home'), 1000));

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
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/signup">
                <Signup />
              </Route>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/test">
                <Employees />
              </Route>
              <Route path="/register">
                <Register />
              </Route>
            </Switch>
          </Layout>
        </Router>
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
