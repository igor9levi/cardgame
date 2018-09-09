import reducer from '../playerReducer';
import * as constants from '../playerConstants';
import * as helpers from '../../../helpers/roundHelpers';

describe('Test playerReducer', () => {
  it('sets default state', () => {
    const action = { type: '@@@@@' };
    expect(reducer(undefined, action)).toEqual(constants.INITIAL_STATE);
  });

  it('initialize game', () => {
    const action = { type: 'GAME_START', payload: 3 };
    const output = {
      cards: [],
      score: [0, 0, 0],
      table: [],
    };
    expect(reducer(undefined, action)).toEqual(output);
  });

  it('set cards', () => {
    const cards = [[{ test: true }, { test: true }], [{ test: true }, { test: true }]];
    const action = { type: 'SET_CARDS', payload: cards };
    const output = {
      cards,
      score: [],
      table: [],
    };
    expect(reducer(undefined, action)).toEqual(output);
  });

  it('add card to table', () => {
    const cards = [[{ test: true }, { test: true }], [{ test: true }, { test: true }]];
    const card = { test: true };
    const action = { type: 'ADD_CARD_TO_TABLE', payload: card };
    const state = {
      cards,
      score: [],
      table: [{ test: true }],
    };
    const output = {
      cards,
      score: [],
      table: [{ test: true }, { test: true }],
    };
    expect(reducer(state, action)).toEqual(output);
  });

  it('flush table', () => {
    helpers.updateScore = jest.fn(() => [0, 1]);
    helpers.removeCardsFromPlayer = jest.fn(() => [[{ test: true }], [{ test: true }]]);
    const cards = [[{ test: true }, { test: true }], [{ test: true }, { test: true }]];
    const card = { test: true };
    const action = { type: 'FLUSH_TABLE', payload: card };
    const state = {
      cards,
      score: [0, 0],
      table: [{ test: true }],
    };
    const output = {
      cards: [[{ test: true }], [{ test: true }]],
      score: [0, 1],
      table: [],
    };
    expect(reducer(state, action)).toEqual(output);
  });
});
