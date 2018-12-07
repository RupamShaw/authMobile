import React from 'react';
import { Text } from 'react-native';
import renderer from 'react-test-renderer';
import { PrivateRoute } from './PrivateRoute';
import {
  Redirect,
  Router,
} from '../router';

const FakeRoute = () => <Text>this should not show to unlogged users</Text>;


describe('PrivateRoute component', () => {
  describe('functionality', () => {
    it('redirects to login route when logged out', () => {
      const tree = renderer.create(
        <Router>
          <PrivateRoute isLoggedIn={false} component={FakeRoute} />
        </Router>,
      ).root;
      expect(tree.findByType(Redirect).props.to.pathname).toEqual('/login');
    });

    it('renders the right Route when logged in', () => {
      const tree = renderer.create(
        <Router>
          <PrivateRoute isLoggedIn component={FakeRoute} />
        </Router>,
      );
      const treeInstance = tree.root;
      expect(treeInstance.findByType('Text').props.children).toEqual('this should not show to unlogged users');
    });
  });
});
