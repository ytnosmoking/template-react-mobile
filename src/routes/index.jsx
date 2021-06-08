import { asyncComponent } from './loadable';
import Loadable from 'react-loadable';
import Loading from 'routes/loadable';
import { lazy } from 'react';
import ChildContainer from 'common/ChildView';

// import Home from 'views/Home';
export const getView = (view) =>
  Loadable({
    loader: () => import(`views/${view}`),
    loading: Loading,
  });

export const getLazy = (view) => lazy(() => import(`views/${view}`));

// baseRoute (layout login)
export const routes = [
  {
    to: '/login',
    title: 'Login',
    // children: import('views/Login')
    // children: Login
    // children: getView('Login')
    // children: getLazy('Login')
    view: asyncComponent('Login'),
  },
];

// configRoute(all other routes)
export const otherRoutes = [
  {
    to: '/home',
    title: 'Home',
    // view: asyncComponent('ChildView', false),
    view: asyncComponent('Home'),
    keepAlive: true,
  },
  {
    to: '/base',
    title: 'Base',
    view: asyncComponent('Base'),
    children: [],
  },
  {
    to: '/hooks',
    title: 'Hooks',
    // view: asyncComponent('ChildView', false),
    view: ChildContainer,
    children: [
      {
        to: '/hooks/memo',
        title: 'memo',
        view: asyncComponent('Hooks/memo'),
      },
    ],
  },
];
