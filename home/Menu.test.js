import React from 'react';
import { View } from 'react-native';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import {
  Menu,
  styles,
} from './Menu';
import { Router } from '../shared/routing/router';
import store from '../store/store';


describe('Menu component', () => {
  it('render the proper structure', () => {
    const tree = renderer.create(
      <Router>
        <Provider store={store}>
          <Menu isLoggedIn />
        </Provider>
      </Router>,
    ).root;

    expect(tree.findByType(View).props.style).toEqual(styles.container);
    expect(tree.findByProps({ to: '/' }).props.style).toEqual(styles.link);
    expect(tree.findByProps({ to: '/' }).props.children).toEqual('Home');
  });
});
