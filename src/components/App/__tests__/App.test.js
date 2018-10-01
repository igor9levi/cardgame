import React from 'react';
import { shallow } from 'enzyme';
import App from '../App';
import { APP_STATUS } from '../appConstants';

describe('Test App', () => {
  it('renders App without crashing status welcome', () => {
    const wrapper = shallow(<App status={APP_STATUS.WELCOME} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders App without crashing status play', () => {
    const wrapper = shallow(<App status={APP_STATUS.PLAY} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders App without crashing status end', () => {
    const wrapper = shallow(<App status={APP_STATUS.END} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders App without crashing status loading', () => {
    const wrapper = shallow(<App status={APP_STATUS.LOADING} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders App without crashing status error', () => {
    const wrapper = shallow(<App status={APP_STATUS.ERROR} />);
    expect(wrapper).toMatchSnapshot();
  });
});
