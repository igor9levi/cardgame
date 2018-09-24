import React from 'react';
import { shallow } from 'enzyme';
import ScoreBoard from '../ScoreBoard';

const score = [5, 6, 3];
const setWelcomeStatus = jest.fn();

describe('Test ScoreBoard', () => {
  it('renders correctly', () => {
    const wrapper = shallow(
      <ScoreBoard
        score={score}
        setWelcomeStatus={setWelcomeStatus}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('calls method on click', () => {
    const wrapper = shallow(
      <ScoreBoard
        score={score}
        setWelcomeStatus={setWelcomeStatus}
      />,
    );
    wrapper.find('#new-game').simulate('click');
    expect(setWelcomeStatus).toBeCalled();
  });
});
