import { shallow } from 'enzyme';
import React from 'react';
import App from './App';

describe('App component', () => {
  it('doesnt renders coz font is loading', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.state().fontLoaded).toBe(false);
    expect(wrapper.find('AppLoading')).toHaveLength(1);
  });
  it(' renders when font loaded', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.state().fontLoaded).toBe(false);
    wrapper.setState({ fontLoaded: true });
    expect(wrapper.find('Provider')).toHaveLength(1);
  });
  it(' statusbar should be there', () => {
    const wrapper = shallow(<App />);

    expect(wrapper.find('StatusBar')).toHaveLength(1);
  });
});
