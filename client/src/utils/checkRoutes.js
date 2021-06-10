import { intersection } from 'lodash';

export const isArrayWithLength = (arr) => {
  return Array.isArray(arr) && arr.length;
};

export const getAllowedRoutes = (routes) => {
  const roles = JSON.parse(localStorage?.getItem('roles'));
  console.log('roles', roles);
  // console.log(routes, role);
  return routes.filter(({ permission }) => {
    console.log('inter', roles, permission, intersection(permission, roles));
    if (!permission) return true;
    else if (!isArrayWithLength(permission)) return true;
    else return intersection(permission, roles).length;
  });
};
