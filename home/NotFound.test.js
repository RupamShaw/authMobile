import React from 'react';
import {
  View,
  Text,
} from 'react-native';
import { shallow } from 'enzyme';

import { NotFound, styles } from './NotFound';

describe('NotFound page', () => {
  it('render the proper structure', () => {
    const tree = shallow(<NotFound />);
    expect(
      tree.contains(
        <View style={styles.container}>
          <Text>404 Page Not Found</Text>
        </View>,
      ),
    ).toBe(true);
    expect(tree.find('Text').props().children).toEqual('404 Page Not Found');
  });
});
