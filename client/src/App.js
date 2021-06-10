/* TODO  import */
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Suspense } from 'react';
import { lazy } from '@loadable/component';
import pMinDelay from 'p-min-delay';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './helpers/PrivateRoute';
import ProtectedRoute from './helpers/ProtectedRoute';
import Dashboard from './features/User/Dashboard';
import LayoutPage from './components/UI/Layout/LayoutPage';
import Loading from './components/UI/Loading';
import { ResumeWrapper } from './contexts/useResume';
import slugify from 'slugify';
import FindJobPage from './pages/FindJobPage';
import CompanyPage from './pages/CompanyPage';
import RegisterCompany from './pages/RegisterCompany';
import CompanyManagerPage from './pages/CompanyManagerPage';
import DashboardPage from './pages/DashboardPage';
// import SigninPage from './pages/SigninPage';
// import SignupPage from './pages/SignupPage';

/* TODO Lazy */
const HomePage = lazy(() => pMinDelay(import('./pages/HomePage'), 500));
const ResumePage = lazy(() => pMinDelay(import('./pages/ResumePage'), 100));

const Signin = lazy(() => pMinDelay(import('./pages/SigninPage'), 500));
const Signup = lazy(() => pMinDelay(import('./pages/SignupPage'), 500));

function App() {
  /* TODO  UI */
  console.log(
    slugify('Project Manager', {
      lower: true,
      locale: 'vi',
    })
  );

  return (
    <>
      <Suspense fallback={<Loading />}>
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
        <Router>
          <Switch>
            <LayoutPage>
              <Route exact path="/" children={<HomePage />} />
              <Route
                path="/manager-company/:service"
                children={<CompanyManagerPage />}
              />
              <Route path="/company" children={<CompanyPage />} />
              <Route path="/register-company" children={<RegisterCompany />} />
              <Route
                path="/resumes/:id"
                children={
                  <ResumeWrapper>
                    <ResumePage />
                  </ResumeWrapper>
                }
              />
              <Route path="/find" children={<FindJobPage />} />
              <Route path="/dashboard" children={<DashboardPage />} />
              <Route children={<Signup />} path="/signup" />
              <Route children={<Signin />} path="/signin" />
              {/* <PrivateRoute
                component={Dashboard}
                path="/dashboard"
                role="admin"
              /> */}
            </LayoutPage>
          </Switch>
        </Router>
      </Suspense>
    </>
  );
}

export default App;
