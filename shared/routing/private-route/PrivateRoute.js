import React from 'react';
import { any } from 'prop-types';
import { connect } from 'react-redux';
import {
  Route,
  Redirect,
} from '../router';

export const PrivateRoute = ({ isLoggedIn, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={
      (props) => {
        if (isLoggedIn) {
          return <Component {...props} />;
        }
        return (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location },
            }}
          />
        );
      }
    }
  />
);

PrivateRoute.propTypes = {
  component: any.isRequired,
};

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
});

export const ConnectPrivateRoute = connect(mapStateToProps)(PrivateRoute);
