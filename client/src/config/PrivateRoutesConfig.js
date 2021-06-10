// Components

import HomeCompanyList from '../components/HomePage/HomeCompanyList';
import DashboardPage from '../pages/DashboardPage';
import { roles } from './Roles';
// TODO:
/*
 * 1. Make title optional
 * 2. Make title multi type support ie: (string, node, react element)
 * 3. Add child route support
 * */

/*
 * Route config object supports all react-router's route component props with some additional props ie: (title, permission, children)
 * you can add or remove props from config object it's means it is super customizable and support upto N nesting, child routes must follow the same parent shape,
 * it means the config object is same for both there is no additional key for child nor for parent.
 * you can find route props from here https://reactrouter.com/web/api/Route let's take a look at some additional props
 * 1. permission: permission is an optional prop and it's type is an array of roles, permission is used for allowing certain users/roles
 *  	to have access of that route and if you skip/omit the permission or it's an empty array that means every authenticated user/role have access to that route.
 * 2. title: title is an optional prop and it's type is a string|node it is used for mapping route link into a navigation
 * 3. children: children is also an optional prop and it's type is an array of route config objects, children are used for nested routes
 * */

export const privateRoutesConfig = [
  {
    component: DashboardPage,
    exact: true,
    path: '/',
    title: 'Dashboard',
    permission: [roles.user, roles.admin, roles.company],
  },

  {
    component: HomeCompanyList,
    path: '/company',
    title: 'Create',
    permission: [roles.user, roles.admin, roles.company],
  },

  // 	children: [
  // 		{
  // 			component: ModuleNChild1,
  // 			path: '/child-1',
  // 			title: 'Child - 1',
  // 		},
  // 		{
  // 			component: ModuleNChild2,
  // 			path: '/child-2',
  // 			title: 'Child - 2',
  // 		},
  // 		{
  // 			component: ModuleNChild3,
  // 			path: '/child-3',
  // 			title: 'Child - 3',
  // 			permission: [
  // 				Roles.SUPER_ADMIN,
  // 				Roles.ADMIN
  // 			]
  // 		}
  // 	]
  // },
];
