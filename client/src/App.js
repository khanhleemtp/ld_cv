import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Suspense } from 'react';
import { lazy } from '@loadable/component';
import pMinDelay from 'p-min-delay';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { pink, yellow } from '@material-ui/core/colors';
import Loading from './components/Loading';
import Layout from './components/Layout';

const Signup = lazy(() => pMinDelay(import('./features/User/Signup'), 1000));
const Login = lazy(() => pMinDelay(import('./features/User/Login'), 1000));
const Home = lazy(() => pMinDelay(import('./components/Home'), 1000));

// overide default themes
const theme = createMuiTheme({
  palette: {
    primary: {
      main: pink[400],
      app: '#2dc08d',
      header: '#e2e4ea',
    },
    secondary: {
      main: yellow[900],
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

  return (
    <ThemeProvider theme={theme}>
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
            </Switch>
          </Layout>
        </Router>
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
