import React, { Fragment } from 'react';
import { Redirect, useRouteMatch } from 'react-router-dom';
// import { TopNav } from 'components/common';
import TopNav from '../components/UI/Layout/TopNav';

import MapAllowedRoutes from './MapAllowedRoutes';
import { privateRoutesConfig } from '../config/PrivateRoutesConfig';
import { isLoggedIn } from '../utils';
import { getAllowedRoutes } from '../utils/checkRoutes';

function PrivateRoutes() {
  const match = useRouteMatch('/app');
  let allowedRoutes = [];

  if (isLoggedIn()) allowedRoutes = getAllowedRoutes(privateRoutesConfig);
  else return <Redirect to="/" />;

  return (
    <Fragment>
      <TopNav routes={allowedRoutes} prefix={match.path} className="bg-white" />
      <MapAllowedRoutes routes={allowedRoutes} basePath="/app" isAddNotFound />
    </Fragment>
  );
}

export default PrivateRoutes;
