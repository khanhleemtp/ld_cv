import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { userSelector } from '../features/User/UserSlice';

const PrivateRoute = ({ component: Component, ...rest }) => {
  // let auth = TokenService.getToken();
  const { token } = useSelector(userSelector);
  return (
    <Route
      {...rest}
      render={(props) => {
        return token ? (
          <Component {...rest} {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/signin',
              state: {
                from: props.location,
              },
            }}
          />
        );
      }}
    />
  );
};

export default PrivateRoute;
