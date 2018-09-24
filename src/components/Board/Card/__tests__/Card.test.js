import React from 'react';
import { shallow } from 'enzyme';
import Card from '../Card';

const props = {
  playerId: 1,
  winner: null,
  center:{
    centerX: 500,
    centerY: 500,
  },
  addCardToTable: jest.fn(),
  removeCard: jest.fn(),
  value: '10',
  alt: 'test-alt',
  src: 'url.com',
  code: '0h',
  blockClick: jest.fn(),
  block: true,
};
describe('Test Card', () => {
  describe('Rendering', () => {
    it('Renders correctly', () => {
      const wrapper = shallow(<Card {...props} />)
      expect(wrapper).toMatchSnapshot();
    });
  });
});
