import React from 'react';
import { shallow } from 'enzyme';
import Welcome from '../Welcome';


describe('Test Welcome', () => {
  it('renders correctly', () => {
    const startGame = () => {};
    const wrapper = shallow(<Welcome startGame={startGame} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('sets 2 player game', () => {
    const startGame = jest.fn();
    const wrapper = shallow(<Welcome startGame={startGame} />);
    const buttons = wrapper.find('button');

    expect(buttons.length).toEqual(3);

    wrapper.find('#btn1').simulate('click');

    expect(startGame).toBeCalled();
    expect(startGame).toHaveBeenCalledTimes(1);
    expect(startGame).toBeCalledWith(2);

    wrapper.find('#btn2').simulate('click');

    expect(startGame).toBeCalled();
    expect(startGame).toHaveBeenCalledTimes(2);
    expect(startGame).toBeCalledWith(3);

    wrapper.find('#btn3').simulate('click');

    expect(startGame).toBeCalled();
    expect(startGame).toHaveBeenCalledTimes(3);
    expect(startGame).toBeCalledWith(4);
  });
});
