
import React from 'react';
import { shallow } from 'enzyme';
import { Header } from './Header';
import translations from '../shared/locales/en-US';

describe('Sign in Header page', () => {
  it('image and text should be there', () => {
    const tree = shallow(<Header translations={translations} />);
    expect(tree.find('Image')).toHaveLength(1);
    expect(tree.find('Text')).toHaveLength(1);
    expect(tree.find('Text').props().children).toEqual(translations.signin_started);
  });
});
