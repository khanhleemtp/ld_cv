import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { TokenService } from '../services/TokenService';

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      TokenService.getToken() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: '/login', state: { from: props.location } }}
        />
      )
    }
  />
);
