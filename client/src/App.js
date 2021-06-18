/* TODO  import */
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { Suspense } from 'react';
import { lazy } from '@loadable/component';
import pMinDelay from 'p-min-delay';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PrivateRoute } from './helpers/PrivateRoutes';
import LayoutPage from './components/UI/Layout/LayoutPage';
import Loading from './components/UI/Loading';
import { ResumeWrapper } from './contexts/useResume';
import slugify from 'slugify';
import FindJobPage from './pages/FindJobPage';
import CompanyPage from './pages/CompanyPage';
import RegisterCompany from './pages/RegisterCompany';
import CompanyManagerPage from './pages/CompanyManagerPage';
import CompanySuggestCandidate from './pages/CompanySuggestCandidate';
import DashboardPage from './pages/DashboardPage';
import AdminPage from './pages/AdminPage';
import JobDetails from './components/FindJobPage/JobDetails';
import UpdateJob from './components/CompanyManager/CompanyUpdaeJob';
import CompanyCandidateList from './components/CompanyManager/CompanyCandidateList';
import Logout from './components/UI/Logout';
import NotFound from './components/UI/NotFound';
import FindCompanyPage from './pages/FindCompanyPage';

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
    slugify('ld-khánh', {
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
              <Route children={<Signup />} path="/signup" />
              <Route children={<Signin />} path="/signin" />
              <Route children={<Logout />} path="/logout" />
              <Route path="/register-company" children={<RegisterCompany />} />
              <Route path="/company/:id" children={<CompanyPage />} />
              <Route path="/companies" children={<FindCompanyPage />} />
              <Route
                path="/dashboard/resumes/:id"
                children={
                  <ResumeWrapper>
                    <ResumePage />
                  </ResumeWrapper>
                }
              />

              <Redirect
                exact
                from="/manager-company"
                to="/manager-company/update-company"
              />
              <PrivateRoute
                exact
                path="/manager-company/:page?"
                component={CompanyManagerPage}
                roles={['company']}
              />

              <PrivateRoute
                roles={['company']}
                path="/suggest-candidate/:id"
                component={CompanySuggestCandidate}
              />

              <PrivateRoute
                roles={['company']}
                path="/cadidate/:id"
                component={CompanyCandidateList}
              />

              <PrivateRoute
                roles={['company']}
                path="/update-job/:id"
                component={UpdateJob}
              />

              <Redirect exact from="/admin" to="/admin/response-company" />
              <PrivateRoute
                exact
                path="/admin/:page?"
                component={AdminPage}
                roles={['admin']}
              />

              <Route path="/find" children={<FindJobPage />} />
              <Route path="/jobs/:id" children={<JobDetails />} />
              <Redirect exact from="/dashboard" to="/dashboard/info" />
              <PrivateRoute
                exact
                roles={['user', 'admin', 'company']}
                path="/dashboard/:page?"
                component={DashboardPage}
              />
            </LayoutPage>

            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </Router>
      </Suspense>
    </>
  );
}

export default App;
