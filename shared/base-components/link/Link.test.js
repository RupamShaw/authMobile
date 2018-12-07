import React from 'react';
import {
  Text,
  Platform,
} from 'react-native';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import Link from './Link';
import { Link as NativeLink, Router } from '../../routing/router';

const isWeb = Platform.OS === 'web';

const path = '/home';

describe('Link component', () => {
  it('should apply styles to children', () => {
    const linkStyle = {
      color: '#898989',
    };
    const linkTextStyle = {
      color: '#f5f5f5',
    };

    const tree = renderer.create(
      <Router>
        <Link to={path} style={linkStyle} textStyle={linkTextStyle}>Test Link</Link>
      </Router>,
    ).root;

    expect(tree.findByType(NativeLink).props.to).toEqual(path);
    if (isWeb) {
      expect(tree.findByType(NativeLink).props.className).toEqual(linkStyle);
    } else {
      expect(tree.findByType(NativeLink).props.style).toEqual(linkStyle);
    }
    expect(tree.findByType(Text).props.style).toEqual(linkTextStyle);
    expect(tree.findByType(Text).props.children).toEqual('Test Link');
  });
});
