import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import RoutePaths from './utils/RoutePaths';
import Login from './components/Login';
import isLoggedIn from './utils/authService';
import Home from './components/Home';
import Layout from './components/Layout';
import Company from './components/Company';
import Country from './components/Country';

export const PrivateRoute = (props) => {
  // eslint-disable-next-line react/prop-types
  const { children } = props;
  if (isLoggedIn()) {
    return (<Route {...props}>{children}</Route>);
  }
  return (<Redirect to={RoutePaths.login} />);
};

const AppRoutes = [
  {
    path: RoutePaths.login,
    isPrivate: false,
    exact: true,
    render: (props) => (
      isLoggedIn() ? <Redirect to={RoutePaths.home} />
        : <Login {...props} />
    ),
  },
  {
    path: RoutePaths.home,
    isPrivate: true,
    exact: true,
    render: (props) => (<Layout {...props}><Home {...props} /></Layout>),
  },
  {
    path: `${RoutePaths.company}/:companyName`,
    isPrivate: true,
    exact: true,
    render: (props) => (<Layout {...props}><Company {...props} /></Layout>),
  },
  {
    path: `${RoutePaths.country}/:countryName`,
    isPrivate: true,
    exact: true,
    render: (props) => (<Layout {...props}><Country {...props} /></Layout>),
  },
  {
    path: RoutePaths.root,
    isPrivate: false,
    exact: false,
    render: () => (
      isLoggedIn() ? <Redirect to={RoutePaths.home} />
        : <Redirect to={RoutePaths.login} />
    ),
  },
];

export default AppRoutes;
