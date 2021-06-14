import React from 'react';
import { Redirect } from 'react-router-dom';
import { TokenService } from '../../services/TokenService';

const Logout = () => {
  TokenService.removeToken();
  return <Redirect to="/" />;
};

export default Logout;
