import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import { AccountLogin } from './AccountLogin';
import translations from '../shared/locales/en-US';
import { Router } from '../shared/routing/router.mock';
import { Redirect } from '../shared/routing/router';

describe('AccountLogin ', () => {
  afterEach(() => {
    fetch.resetMocks();
  });
  describe(' components structure', () => {
    it('has the header,signIn,signUp and language components', () => {
      const wrapper = shallow(
        <AccountLogin
          isLoggedIn={false}
          translations={translations}
          isLoading={false}
        />,
      );
      expect(wrapper.find('Connect(Header)').exists()).toEqual(true);
      expect(wrapper.find('Connect(SignIn)').exists()).toEqual(true);
      expect(
        wrapper
          .find('Text')
          .last()
          .props().children,
      ).toEqual(translations.new_matrak);
      expect(wrapper.find('Button').props().text).toEqual(translations.signup);
      expect(wrapper.find('Connect(LanguageDropDown)').exists()).toEqual(true);
    });
    it('redirects to home when user is logged in', () => {
      const tree = renderer.create(
        <Router>
          <AccountLogin
            isLoggedIn
            isLoading={false}
            translations={translations}
          />
        </Router>,
      ).root;

      expect(tree.findByType(Redirect).props.to).toEqual('/');
    });
    it('redirects to signup when user press button', () => {
      const tree = shallow(
        <AccountLogin
          isLoggedIn={false}
          isLoading={false}
          translations={translations}
        />,
      );
      expect(tree.find('Button')).toHaveLength(1);
      expect(
        tree
          .find('Button')
          .at(0)
          .props().text,
      ).toEqual(translations.signup);
      tree
        .find('Button')
        .at(0)
        .simulate('click');
      expect(tree.find(Redirect).exists()).toBe(true);
      expect(tree.find(Redirect).props().to).toEqual('/signup');
    });
  });
});
