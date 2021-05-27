import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { TokenService } from '../services/TokenService';

const PrivateRoute = ({ component: Component, ...rest }) => {
  let auth = TokenService.getToken();
  return (
    <Route
      {...rest}
      render={(props) => {
        if (auth) {
          return <Component {...rest} {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: '/signin',
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
};

export default PrivateRoute;
