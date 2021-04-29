import { TokenService } from '../services/TokenService';
import { Redirect, Route } from 'react-router-dom';

const PublicRoute = ({ component: Component, redirect, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        TokenService.getToken() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: redirect, state: { from: props.location } }}
          />
        )
      }
    />
  );
};

export default PublicRoute;
