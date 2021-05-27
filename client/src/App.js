/* TODO  import */
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Suspense } from 'react';
import { lazy } from '@loadable/component';
import pMinDelay from 'p-min-delay';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { blue, pink } from '@material-ui/core/colors';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './helpers/PrivateRoute';
import ProtectedRoute from './helpers/ProtectedRoute';
import Dashboard from './features/User/Dashboard';
import DragPage from './pages/DragPage/DragPage';
import LayoutPage from './components/UI/Layout/LayoutPage';
import Loading from './components/UI/Loading';

/* TODO Lazy */
const HomePage = lazy(() => pMinDelay(import('./pages/HomePage'), 500));
const ResumePage = lazy(() => pMinDelay(import('./pages/ResumePage'), 100));

const Signin = lazy(() => pMinDelay(import('./features/User/Signin'), 500));
const Signup = lazy(() => pMinDelay(import('./features/User/Signup'), 500));

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
      title: '#008CFF',
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
          <LayoutPage>
            <Switch>
              <Route exact path="/" children={<HomePage />} />
              <Route path="/drag" children={<DragPage />} />
              <Route path="/resume" children={<ResumePage />} />
              <ProtectedRoute component={Signup} path="/signup" />
              <Route path="/signin" component={Signin} />
              <PrivateRoute component={Dashboard} path="/dashboard" />
            </Switch>
          </LayoutPage>
        </Router>
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
