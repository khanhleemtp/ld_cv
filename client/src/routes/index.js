import React, { memo } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoutes from './PrivateRoutes';
import Auth from './Auth';
// import { history } from '../utils/history';

function Routes() {
  return (
    <Switch>
      <Route path="/app">
        <PrivateRoutes />
      </Route>
      <Route path="">
        <Auth />
      </Route>
    </Switch>
  );
}

export default memo(Routes);
