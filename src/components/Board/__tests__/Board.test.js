import React from 'react';
import { shallow } from 'enzyme';
import Board from '../Board';
import * as roundHelpers from '../../../helpers/roundHelpers';
import * as animationHelpers from '../../../helpers/animationHelpers';

const testCards = [
  [{
    key: 1,
    code: 1,
    alt: 1,
    src: 'img',
    value: 1,
    playerId: 0,
  }], [{
    key: 2,
    code: 2,
    alt: 2,
    src: 'img',
    value: 2,
    playerId: 1,
  }], [{
    key: 3,
    code: 3,
    alt: 3,
    src: 'img',
    value: 3,
    playerId: 2,
  }],
];

const props = {
  cards: testCards,
  numPlayers: 3,
  table: [{}, {}],
  score: [0, 0, 0],
  addCardToTable: jest.fn(),
  flushTable: jest.fn(),
  setEndStatus: jest.fn(),
  setRoundWinner: jest.fn(),
  unblockClick: jest.fn(),
};

roundHelpers.getCenter = jest.fn(() => ({
  centerX: 0,
  centerY: 0,
}));

describe('Test Board component', () => {
  describe('Test rendering', () => {
    it('Renders correctly', () => {
      const wrapper = shallow(
        <Board {...props} />,
      );
      expect(wrapper).toMatchSnapshot();
    });

    it('Renders correctly all 4 players', () => {
      const wrapper = shallow(
        <Board {...props} numPlayers={4} score={[0, 0, 0, 0]} />,
      );
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('Test removeCard', () => {
    it('Adds card to purgatory', () => {
      const wrapper = shallow(
        <Board {...props} />,
      );
      wrapper.instance().purgatory = [2];
      wrapper.instance().removeCard(4);
      expect(wrapper.instance().purgatory).toEqual([2, 4]);
    });

    it('Not to add card to purgatory if already exists', () => {
      const wrapper = shallow(
        <Board {...props} />,
      );
      wrapper.instance().purgatory = [2, 3];
      wrapper.instance().removeCard(2);
      expect(wrapper.instance().purgatory).toEqual([2, 3]);
    });

    it('Adds card to purgatory and flushes table', () => {
      const wrapper = shallow(
        <Board {...props} />,
      );
      wrapper.instance().purgatory = [2, 3];
      wrapper.instance().removeCard(4);
      expect(wrapper.instance().purgatory).toEqual([]);
      expect(wrapper.instance().props.flushTable).toBeCalled();
      expect(wrapper.instance().props.flushTable).toHaveBeenCalledTimes(1);
    });
  });

  describe('Test setWinnerToPlay', () => {
    it('shift playersTurn to match winner and call setState', () => {
      const wrapper = shallow(
        <Board {...props} />,
      );
      wrapper.instance().setState = jest.fn();
      wrapper.instance().state.playersTurn = [0, 1, 2, 3];
      wrapper.instance().setWinnerToPlay(2);
      expect(wrapper.instance().setState).toBeCalled();
      expect(wrapper.instance().setState)
        .toHaveBeenCalledWith({ playersTurn: [2, 3, 0, 1] });
    });
  });

  describe('Test shufflePlayers', () => {
    it('rotate playersTurn by one and call setState', () => {
      const wrapper = shallow(
        <Board {...props} />,
      );
      wrapper.instance().setState = jest.fn();
      wrapper.instance().state = { playersTurn: [0, 1, 2, 3] };
      wrapper.instance().shufflePlayers();
      expect(wrapper.instance().setState).toBeCalled();
      expect(wrapper.instance().setState)
        .toHaveBeenCalledWith({ playersTurn: [1, 2, 3, 0] });
    });
  });

  describe('Test componentDidUpdate', () => {
    it('test call endGame when game finishes', () => {
      const prevProps = {};
      const prevState = {};
      const wrapper = shallow(
        <Board {...props} />,
      );
      wrapper.instance().playRound = jest.fn();
      roundHelpers.gameEnd = jest.fn(() => false);
      roundHelpers.shouldPlayRound = jest.fn(() => true);
      wrapper.instance().componentDidUpdate(prevProps, prevState);
      expect(roundHelpers.gameEnd).toBeCalled();
      expect(wrapper.instance().props.setEndStatus).not.toBeCalled();
      expect(roundHelpers.shouldPlayRound).toBeCalled();
      expect(wrapper.instance().playRound).toBeCalled();
    });

    it('test call endGame when game finishes', () => {
      const prevProps = {};
      const prevState = {};
      const wrapper = shallow(
        <Board {...props} />,
      );
      roundHelpers.gameEnd = jest.fn(() => true);
      roundHelpers.shouldPlayRound = jest.fn(() => false);
      wrapper.instance().componentDidUpdate(prevProps, prevState);
      expect(roundHelpers.gameEnd).toBeCalled();
      expect(wrapper.instance().props.setEndStatus).toBeCalled();
    });
  });

  describe('Test resetRound', () => {
    it('Calls setWinnerToPlay and setRoundWinner', () => {
      const wrapper = shallow(
        <Board {...props} />,
      );
      roundHelpers.calculateRoundWinner = jest.fn(() => ({ playerId: 1 }));
      wrapper.instance().setWinnerToPlay = jest.fn();
      wrapper.instance().resetRound();
      expect(wrapper.instance().props.setRoundWinner).toBeCalled();
      expect(wrapper.instance().setWinnerToPlay).toBeCalled();
    });
  });

  describe('Test playRound', () => {
    it('resets round', async () => {
      const wrapper = shallow(
        <Board {...props} numPlayers={2} />,
      );
      wrapper.instance().state = { playersTurn: [0, 1] };
      wrapper.instance().resetRound = jest.fn();
      const result = await wrapper.instance().playRound();
      expect(wrapper.instance().resetRound).toBeCalled();
      expect(result).toEqual(undefined);
    });

    it('it is humans turn to play', async () => {
      const wrapper = shallow(
        <Board {...props} numPlayers={3} />,
      );
      animationHelpers.pause = jest.fn(() => Promise.resolve({}));
      // wrapper.instance().state = { playersTurn: [0, 1, 2] };
      wrapper.setState({ playersTurn: [0, 1, 2] });
      wrapper.instance().resetRound = jest.fn();
      const result = await wrapper.instance().playRound();

      expect(result).toEqual(false);
      expect(wrapper.instance().resetRound).not.toBeCalled();
      expect(animationHelpers.pause).not.toBeCalled();
      expect(props.unblockClick).toBeCalled();
    });

    it('add random card to table after 500ms', async () => {
      const wrapper = shallow(
        <Board {...props} numPlayers={3} />,
      );
      animationHelpers.pause = jest.fn(() => Promise.resolve({}));
      wrapper.instance().state = { playersTurn: [1, 2, 0] };
      wrapper.instance().resetRound = jest.fn();
      const result = await wrapper.instance().playRound();
      expect(wrapper.instance().resetRound).not.toBeCalled();
      expect(animationHelpers.pause).toBeCalled();
      expect(wrapper.instance().props.addCardToTable).toBeCalled();
      expect(result).toEqual(undefined);
    });
  });
});
