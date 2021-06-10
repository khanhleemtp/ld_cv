import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import TopNav from '../components/UI/Layout/TopNav';
import HomePage from '../pages/HomePage';
import SigninPage from '../pages/SigninPage';
import SignupPage from '../pages/SignupPage';

const navOptions = [
  { title: 'Đăng nhập', path: '/signin' },
  { title: 'Đăng ký', path: '/signup' },
];

function PublicRoutes() {
  return (
    <Fragment>
      <TopNav routes={navOptions} prefix="" />
      <Switch>
        <Route path="/signup">
          <SignupPage />
        </Route>
        <Route path="/signin">
          <SigninPage />
        </Route>
        <Route path="">
          <HomePage />
        </Route>
      </Switch>
    </Fragment>
  );
}

export default PublicRoutes;
