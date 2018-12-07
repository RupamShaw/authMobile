import React from 'react';
import { shallow } from 'enzyme';
import { Dashboard } from './Dashboard';
import translations from '../../shared/locales/en-US';

// const logoImage = require('./../../assets/matrak-logo.png');

describe('Dashboard page', () => {
  describe('functionality', () => {
    it('trigger logout onClick calls logout action', () => {
      const logout = jest.fn();
      const tree = shallow(
        <Dashboard logout={logout} translations={translations} />,
      );
      const btn = tree.find({ text: 'Logout' });

      btn.simulate('click');
      expect(logout.mock.calls).toHaveLength(1);
      expect(logout).toBeCalled();
    });
  });
});
