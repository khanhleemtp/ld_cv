import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { TokenService } from '../services/TokenService';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  let auth = TokenService.getToken();
  console.log(auth);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (auth) {
          return (
            <Redirect
              to={{
                pathname: '/dashboard',
                state: {
                  from: props.location,
                },
              }}
            />
          );
        } else {
          return <Component {...rest} {...props} />;
        }
      }}
    />
  );
};

export default ProtectedRoute;
