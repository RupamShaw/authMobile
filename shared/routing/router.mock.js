import {
  Router as ReactRouter,
  Redirect,
  Link,
  Route,
  Switch,
} from 'react-router-dom';
import React from 'react';
import { any } from 'prop-types';

export {
  Redirect,
  Link,
  Route,
  Switch,
};

const history = {
  location: '/login',
  listen: jest.fn(),
  createHref: jest.fn(),
  replace: jest.fn(),
  push: jest.fn(),
};

export const Router = ({ children }) => <ReactRouter history={history}>{children}</ReactRouter>;

Router.defaultProps = {
  children: '',
};

Router.propTypes = {
  children: any,
};
