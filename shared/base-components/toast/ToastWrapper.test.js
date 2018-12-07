import React from 'react';
import { shallow } from 'enzyme';
import { ToastWrapper } from './ToastWrapper';
import Config from '../../config';
import {
  ERROR_COLOR,
  MESSAGE_COLOR,
} from '../../baseStyles';

describe(' component', () => {
  const message = 'matrak';
  let tree;
  const resetToast = jest.fn();

  it('accepts proper toast message', () => {
    tree = shallow(<ToastWrapper message={message} dispatchResetToast={resetToast} />);
    expect(tree.find('Toast').props().message).toEqual(message);
  });

  it('no color or duration passed should give default props color and duration', () => {
    tree = shallow(<ToastWrapper message={message} dispatchResetToast={resetToast} />);
    expect(tree.find('Toast').props().color).toEqual(ERROR_COLOR);
    expect(tree.find('Toast').props().duration).toEqual(Config.ToastMessageDuration);
  });

  it('color and duration passed should return passed color and duration', () => {
    tree = shallow(
      <ToastWrapper color={MESSAGE_COLOR} duration={8000} dispatchResetToast={resetToast} message={message} />,
    );
    expect(tree.find('Toast').exists()).toBeTruthy();
    expect(tree.find('Toast').props().color).toEqual(MESSAGE_COLOR);
    expect(tree.find('Toast').props().duration).toEqual(8000);
  });

  it('toast to be displayed for given amount of time', async () => {
    tree = shallow(
      <ToastWrapper duration={100} message="" dispatchResetToast={resetToast} />,
    );
    tree.setProps({ message: 'testing' });
    expect(tree.find('Toast').exists()).toBeTruthy();
    await new Promise(resolve => setTimeout(() => {
      resolve();
      tree.setProps({ message: '' });
    }, 100));
    expect(tree.find('Toast').exists()).toBeFalsy();
  });

  it('blank message  no toast and with non blank message  Toast exist', async () => {
    tree = shallow(
      <ToastWrapper duration={100} message={message} dispatchResetToast={resetToast} />,
    );
    expect(tree.find('Toast').exists()).toBeTruthy();
    tree.setProps({ message: '' });
    expect(tree.find('Toast').exists()).toBeFalsy();
  });
});
