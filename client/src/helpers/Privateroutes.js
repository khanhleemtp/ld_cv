import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { userSelector } from '../features/User/UserSlice';
import { TokenService } from '../services/TokenService';

export const PrivateRoute = ({ component: Component, roles, ...rest }) => {
  const { user } = useSelector(userSelector);
  const role = user?.role;

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!TokenService.getToken()) {
          // not logged in so redirect to login page with the return url
          return (
            <Redirect
              to={{ pathname: '/signin', state: { from: props.location } }}
            />
          );
        }

        // check if route is restricted by role
        if (roles && roles.indexOf(role) === -1) {
          // role not authorised so redirect to home page
          return <Redirect to={{ pathname: '/' }} />;
        }

        // authorised so return component
        return <Component {...props} />;
      }}
    />
  );
};
