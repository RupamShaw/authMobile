
import React from 'react';
import { shallow } from 'enzyme';
import { LanguageDropDown } from './LanguageDropDown';

describe('Sign in LanguageDropDown page', () => {
  let tree;
  let mockFunc;
  beforeEach(() => {
    mockFunc = jest.fn();
    tree = shallow(<LanguageDropDown dispatchLocale={mockFunc} />);
  });
  it('image , text  image should be there', () => {
    expect(tree.find('Image')).toHaveLength(2);
    expect(tree.find('Text')).toHaveLength(1);
    expect(tree.find('Text').props().children).toEqual('EN');
  });
  it('only one item in dropdown', () => {
    expect(tree.find('ModalDropdown').props().options).toHaveLength(1);
  });
  it('text and dropdown value not be similar', () => {
    expect(tree.find('Text').props().children).not.toBe(
      tree.find('ModalDropdown').props().options,
    );
  });
  it('onselect renders correct value in text', () => {
    // const ddoption = tree.find('ModalDropdown').props().options;
    tree
      .find('ModalDropdown')
      .props()
      .renderRow();
    tree.find('ModalDropdown').simulate('select');
    tree.setProps({ currentLocale: 'cn' });
    expect(tree.find('Text').props().children).toEqual('CN');
  });
});
