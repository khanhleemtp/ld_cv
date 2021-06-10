import React from 'react';

export const AuthContext = React.createContext();

export const checkAuth = ({ authorization, roleType }) => {
  let hasRequiredRole = false;

  if (authorization.roles) {
    let roles = authorization.roles.map((item) => item.toLowerCase());

    hasRequiredRole = roles.includes(roleType);
  }

  return [hasRequiredRole];
};
