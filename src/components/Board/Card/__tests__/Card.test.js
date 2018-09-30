import React from 'react';
import { shallow } from 'enzyme';
import Card from '../Card';
import * as animation from '../../../../helpers/animationHelpers';
import * as roundHelpers from '../../../../helpers/roundHelpers';
import { HUMAN_PLAYER_ID } from '../../../App/appConstants';

const props = {
  playerId: 1,
  winner: null,
  center: {
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
      const wrapper = shallow(<Card {...props} />);
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('componentDidUpdate', () => {
    it('flushes to remove card', () => {
      const component = new Card({});
      component.state = { flush: true };
      component.removeCard = jest.fn();

      const result = component.componentDidUpdate();

      expect(result).toEqual(undefined);
      expect(component.removeCard).toBeCalled();
      expect(component.removeCard).toHaveBeenCalledTimes(1);
    });

    it('should rotate card', () => {
      const component = new Card({});
      component.state = { flush: false };
      animation.shouldRotateCard = jest.fn(() => true);
      component.rotateCard = jest.fn();

      const result = component.componentDidUpdate();

      expect(result).toEqual(undefined);
      expect(component.rotateCard).toBeCalled();
      expect(component.rotateCard).toHaveBeenCalledTimes(1);
    });

    it('should animate card', () => {
      const component = new Card({});
      component.state = { flush: false };
      animation.shouldRotateCard = jest.fn(() => false);
      animation.shouldAnimateCard = jest.fn(() => true);
      component.animateCard = jest.fn();

      const result = component.componentDidUpdate();

      expect(result).toEqual(undefined);
      expect(component.animateCard).toBeCalled();
      expect(component.animateCard).toHaveBeenCalledTimes(1);
    });

    it('should play next card', () => {
      const component = new Card({});
      component.state = { flush: false };
      animation.shouldRotateCard = jest.fn(() => false);
      animation.shouldAnimateCard = jest.fn(() => false);
      animation.isCentered = jest.fn(() => true);
      component.playNextCard = jest.fn();

      const result = component.componentDidUpdate();

      expect(result).toEqual(undefined);
      expect(component.playNextCard).toBeCalled();
      expect(component.playNextCard).toHaveBeenCalledTimes(1);
    });
    it('should play animate off card', () => {
      const component = new Card({});
      component.state = { flush: false };
      animation.shouldRotateCard = jest.fn(() => false);
      animation.shouldAnimateCard = jest.fn(() => false);
      animation.isCentered = jest.fn(() => false);
      animation.shouldAnimateOff = jest.fn(() => true);
      component.animateCardOff = jest.fn();

      const result = component.componentDidUpdate();

      expect(result).toEqual(undefined);
      expect(component.animateCardOff).toBeCalled();
      expect(component.animateCardOff).toHaveBeenCalledTimes(1);
    });
  });

  describe('removeCard ', () => {
    it('Removes correctly', async () => {
      animation.pause = jest.fn();
      const removeCard = jest.fn();
      const code = 'test';
      const component = new Card({ removeCard, code });

      await component.removeCard({ removeCard, code });

      expect(removeCard).toBeCalled();
      expect(animation.pause).toBeCalled();
      expect(removeCard).toHaveBeenCalledTimes(1);
      expect(animation.pause).toHaveBeenCalledTimes(1);
      expect(removeCard).toHaveBeenCalledWith(code);
      expect(animation.pause).toHaveBeenCalledWith(200);
    });
  });

  describe('rotateCard ', () => {
    it('Rotates correctly', () => {
      const component = new Card({ code: 'test' });

      component.setState = jest.fn();
      component.rotateCard();

      expect(component.setState).toBeCalled();
      expect(component.setState).toHaveBeenCalledTimes(1);
      expect(component.setState).toHaveBeenCalledWith({
        flip: true,
        styling: { transitionDuration: '0.5s', zIndex: 1000 },
      });
    });
  });

  describe('animateCard  ', () => {
    it('calls setState with correct params', async () => {
      animation.pause = jest.fn();
      roundHelpers.calculateTablePosition = jest.fn(() => ({ left: 0, top: 0 }));

      const component = new Card({ center: { centerX: 0, centerY: 0 }, playerId: 1 });
      component.setState = jest.fn();
      component.cardRef = { current: { height: 50 } };
      await component.animateCard();
      expect(component.setState).toBeCalled();
      expect(component.setState).toHaveBeenCalledTimes(1);
      expect(component.setState).toHaveBeenCalledWith({
        centered: true,
        styling: {
          position: 'absolute',
          transitionDuration: '0.5s',
          left: 0,
          top: 0,
        },
      });

      expect(animation.pause).toBeCalled();
      expect(animation.pause).toHaveBeenCalledTimes(1);
      expect(animation.pause).toHaveBeenCalledWith(500);
    });
  });

  describe('playNextCard   ', () => {
    it('calls setState with correct params', async () => {
      animation.pause = jest.fn();
      const animationFinished = jest.fn();
      const component = new Card({ animationFinished });

      await component.playNextCard();

      expect(animationFinished).toBeCalled();
      expect(animationFinished).toHaveBeenCalledTimes(1);

      expect(animation.pause).toBeCalled();
      expect(animation.pause).toHaveBeenCalledTimes(1);
      expect(animation.pause).toHaveBeenCalledWith(200);
    });
  });

  describe('animateCardOff', () => {
    it('calls setState with correct params', () => {
      const left = 0;
      const top = 0;
      roundHelpers.cardMoveDirection = jest.fn(() => ({}));

      const component = new Card({ winner: 2, center: { centerX: 0, centerY: 0 }, playerId: 1 });
      component.setState = jest.fn();

      component.animateCardOff();

      expect(component.setState).toBeCalled();
      expect(component.setState).toHaveBeenCalledTimes(1);
      expect(component.setState).toHaveBeenCalledWith({
        flush: true,
        styling: {
          position: 'absolute',
          transitionDuration: '0.5s',
          left,
          top,
        },
      });
    });
  });

  describe('handleClick', () => {
    it('player is NOT human or it is not humans card, returns null', () => {
      const cardProps = {
        playerId: 2,
        addCardToTable: jest.fn(),
        value: 'test-val',
        code: 'test',
        block: true,
        blockClick: jest.fn(),
      };

      const component = new Card({ ...cardProps });

      let result = component.handleClick();

      expect(result).toEqual(null);

      component.props.playerId = HUMAN_PLAYER_ID;
      result = component.handleClick();

      expect(result).toEqual(null);
      expect(cardProps.addCardToTable).not.toBeCalled();
    });

    it('player is human or it is humans card, returns null', () => {
      const cardProps = {
        playerId: HUMAN_PLAYER_ID,
        addCardToTable: jest.fn(),
        value: 'test-val',
        code: 'test',
        block: false,
        blockClick: jest.fn(),
      };
      const component = new Card({ ...cardProps });

      component.handleClick();

      expect(cardProps.blockClick).toBeCalled();
      expect(cardProps.addCardToTable).toBeCalled();
    });
  });
});
