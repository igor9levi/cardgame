import React from 'react';
import { shallow } from 'enzyme';
import Error from '../Error';

describe('Test Error', () => {
  it('renders correctly', () => {
    const error = { message: 'Some error occured!' };
    const setWelcomeStatus = jest.fn();
    const wrapper = shallow(
      <Error
        error={error}
        setWelcomeStatus={setWelcomeStatus}
      />);
    expect(wrapper).toMatchSnapshot();
  });

  it('tries game again on click', () => {
    const error = { message: 'Some error occured!' };
    const setWelcomeStatus = jest.fn();
    const wrapper = shallow(
      <Error
        error={error}
        setWelcomeStatus={setWelcomeStatus}
      />);
    wrapper.find('#try-again').simulate('click');
    expect(setWelcomeStatus).toBeCalled();
  });
});