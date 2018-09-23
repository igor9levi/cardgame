import React from 'react';
import { shallow } from 'enzyme';
import ScoreBoard from '../ScoreBoard';

const props = {
  score: [5, 6, 3],
  setWelcomeStatus: jest.fn(),
};

describe('Test ScoreBoard', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<ScoreBoard {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('calls method on click', () => {
    const wrapper = shallow(<ScoreBoard {...props} />);
    // const button = wrapper.find('button').get(0);
    wrapper.find('button').simulate('click')
    // button.click();
    expect(wrapper.props.setWelcomeStatus).toBeCalled();
  });
});