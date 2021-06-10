import React, { Fragment, useContext } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AuthContext, checkAuth } from './checkAuth';
import App from './components/App';
import Home from './components/home';
import Admin from './components/admin';
import Login from './components/auth/Login';
import Unauthorized from './components/Unauthorized ';
import Notfound from './components/404';
import { userSelector } from '../features/User/UserSlice';

const ProtectedRoute = ({ component: Component, roleType, ...rest }) => {
  const authorization = useContext(AuthContext);
  const [hasRequiredRole] = checkAuth({ authorization, roleType });
  return (
    <Route
      {...rest}
      render={(props) =>
        hasRequiredRole ? <Component {...props} /> : <Unauthorized {...props} />
      }
    />
  );
};

const Privateroutes = (props) => {
  const { user, token } = useSelector(useSelector);
  let role = user?.role;

  //   const { accessToken, authorization } = props.authData;
  if (token) {
    return (
      <Fragment>
        <AuthContext.Provider value={role}>
          <App>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/login" render={() => <Redirect to="/" />} />
              <Route exact path="/home" component={Home} />
              <ProtectedRoute
                exact
                path="/admin"
                component={Admin}
                roleType="admin"
              />
              <Route path="/404" component={Notfound} />
              <Route path="*" render={() => <Redirect to="/404" />} />
            </Switch>
          </App>
        </AuthContext.Provider>
      </Fragment>
    );
  } else {
    return (
      <Fragment>
        <Route exact path="/login" component={Login} />
        <Route exact path="*" render={() => <Redirect to="/login" />} />
      </Fragment>
    );
  }
};

// my user reducer sample
// const accessToken = localStorage.getItem('token')
//   ? JSON.parse(localStorage.getItem('token')).accessToken
//   : false;

// const initialState = {
//   accessToken: accessToken ? accessToken : null,
//   authorization: accessToken
//     ? jwtDecode(JSON.parse(localStorage.getItem('token')).accessToken)
//         .authorization
//     : null
// };

// export default function(state = initialState, action) {
// switch (action.type) {
// case actionTypes.FETCH_LOGIN_SUCCESS:
//   let token = {
//                  accessToken: action.payload.token
//               };
//   localStorage.setItem('token', JSON.stringify(token))
//   return {
//     ...state,
//     accessToken: action.payload.token,
//     authorization: jwtDecode(action.payload.token).authorization
//   };
//    default:
//         return state;
//    }
//    }

export default Privateroutes;
