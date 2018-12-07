
import React from 'react';
import { shallow } from 'enzyme';
import { SignIn } from './SignIn';
import translations from '../shared/locales/en-US';
import { Redirect } from '../shared/routing/router';
import { isWeb } from '../shared/common';

describe('SignIn page', () => {
  describe('rendering', () => {
    it('has floatingLabelInput', () => {
      const login = jest.fn();
      const tree = shallow(<SignIn dispatchLogin={login} translations={translations} />);
      expect(tree.find('FloatingLabelInput')).toHaveLength(2);
      expect(tree.find('FloatingLabelInput').first().props().label).toEqual(translations.login__username__placeholder);
      expect(tree.find('FloatingLabelInput').last().props().label).toEqual(translations.login__password__placeholder);
    });
    it('should have signIn  and forgotpassword button ', () => {
      const login = jest.fn();
      const tree = shallow(<SignIn dispatchLogin={login} translations={translations} />);
      expect(tree.find('Button')).toHaveLength(2);
      expect(tree.find('Button').first().props().text).toEqual(translations.forgot_password);
      expect(tree.find('Button').last().props().text).toEqual(translations.login);
    });
  });

  describe('functionality', () => {
    let setToast;
    let login;
    let btn;
    let tree;
    let user;
    let userName;
    let password;
    let instance;
    beforeEach(() => {
      userName = 'matrak';
      password = '123';

      user = {
        userName: 'matrak',
        password: '123',
      };

      login = jest.fn();
      setToast = jest.fn();
      tree = shallow(
        <SignIn dispatchLogin={login} dispatchSetToast={setToast} translations={translations} />,
      );
      btn = tree.find({ text: translations.login });
      instance = tree.instance();
    });
    it('submit function should submits and calls the login action', () => {
      tree.setState(user);
      btn.simulate('click');
      expect(login).toBeCalledWith(user);
      // test to check passed params
      expect(login.mock.calls[0][0]).toEqual({ userName: 'matrak', password: '123' });
      expect(login.mock.calls).toHaveLength(1);
    });
    it('username  and password blank', () => {
      btn.simulate('click');
      expect(tree.state().error).toEqual(translations.login_username_password_required);
    });
    it('username blank', () => {
      user = {
        userName: '',
        password: '123',
      };
      tree.setState(user);
      btn.simulate('click');
      expect(tree.state().error).toEqual(translations.login_username_required);
    });
    it('password blank', () => {
      user = {
        userName: 'matrak',
        password: '',
      };
      tree.setState(user);
      btn.simulate('click');
      expect(tree.state().error).toEqual(translations.login_password_required);
    });

    it('redirects to forgotpassword when user press this button', () => {
      expect(tree.find('Button')).toHaveLength(2);
      expect(tree.find('Button').at(0).props().text).toEqual(translations.forgot_password);
      tree.find('Button').at(0).simulate('click');
      expect(tree.find(Redirect).exists()).toBe(true);
      expect(tree.find(Redirect).props().to).toEqual('/forgotPassword');
    });

    it('onUserNameChange/passwordChange should store the UserName/password in the state', () => {
      instance.onUserNameChange(userName);
      instance.onPasswordChange(password);
      expect(instance.state.userName).toEqual(userName);
      expect(instance.state.password).toEqual(password);
    });

    it('handleKeyDown calls should not call submit when receives any other key except for Enter', () => {
      const key = 'Enter';
      instance.onUserNameChange(userName);
      instance.onPasswordChange(password);
      instance.submit = jest.fn();

      instance.handleKeyDown(
        isWeb ? { key: 'Up' } : { nativeEvent: { key: 'Up' } },
      );
      expect(instance.submit).not.toBeCalled();
      expect(instance.submit.mock.calls).toHaveLength(0);
      instance.handleKeyDown(
        isWeb ? { key: 'Down' } : { nativeEvent: { key: 'Down' } },
      );
      expect(instance.submit).not.toBeCalled();
      expect(instance.submit.mock.calls).toHaveLength(0);
      instance.handleKeyDown(
        isWeb ? { key: '42' } : { nativeEvent: { key: '42' } },
      );
      expect(instance.submit).not.toBeCalled();
      expect(instance.submit.mock.calls).toHaveLength(0);

      instance.handleKeyDown(isWeb ? { key } : { nativeEvent: { key } });
      expect(instance.state.error).toEqual('');
    });
  });
  describe('clientside errors on press enter', () => {
    let instance; let key; let tree;
    beforeEach(() => {
      const login = jest.fn();
      const setToast = jest.fn();
      key = 'Enter';
      tree = shallow(
        <SignIn dispatchLogin={login} dispatchSetToast={setToast} translations={translations} />,
      );
      // const btn = tree.find({ text: translations.login });
      instance = tree.instance();
    });
    it('username  password blank', () => {
      instance.submit = jest.fn();
      instance.handleKeyDown(isWeb ? { key } : { nativeEvent: { key } });
      expect(instance.state.error).toEqual(translations.login_username_password_required);
    });
    it('username  blank', () => {
    //  const userName = '';
      const password = '1234';
      instance.onPasswordChange(password);
      instance.submit = jest.fn();
      instance.handleKeyDown(isWeb ? { key } : { nativeEvent: { key } });
      expect(instance.state.error).toEqual(translations.login_username_required);
    });
    it('password  blank', () => {
      const userName = 'matrak';
      // const password = '';
      instance.onUserNameChange(userName);
      instance.submit = jest.fn();
      instance.handleKeyDown(isWeb ? { key } : { nativeEvent: { key } });
      expect(instance.state.error).toEqual(translations.login_password_required);
    });
  });
  describe('serverside errors ', () => {
    let user; let tree;
    beforeEach(() => {
      user = {
        userName: 'matrak',
        password: '123',
      };
    });
    it('username/password Invalid', () => {
      const login = jest.fn();
      const setToast = jest.fn();
      const lastError = { error: translations.login_username_password_invalid };
      tree = shallow(<SignIn
        lastError={lastError}
        hasError
        dispatchSetToast={setToast}
        dispatchLogin={login}
        translations={translations}
      />);
      tree.setState(user);
      expect(tree.state().error).toEqual(
        translations.login_username_password_invalid,
      );
    });

    it('System Problem ', () => {
      const login = jest.fn();
      const setToast = jest.fn;
      const lastError = { error: translations.login_system_problem };
      tree = shallow(<SignIn
        lastError={lastError}
        hasError
        dispatchSetToast={setToast}
        dispatchLogin={login}
        translations={translations}
      />);
      tree.setState(user);
      expect(tree.state().error).toEqual(translations.login_system_problem);
    });
    it('no internet or server disconnected', () => {
      const login = jest.fn();
      const setToast = jest.fn();
      const lastError = { error: translations.login_check_internet_server_down };
      tree = shallow(<SignIn
        lastError={lastError}
        hasError
        dispatchSetToast={setToast}
        dispatchLogin={login}
        translations={translations}
      />);
      tree.setState(user);
      expect(tree.state().error).toEqual(translations.login_check_internet_server_down);
    });
  });
});
