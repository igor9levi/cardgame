import reducer from '../appReducer';
import * as constants from '../appConstants';
import { APP_STATUS } from '../appConstants';

describe('Test appReducer', () => {
  it('returns default state', () => {
    const result = reducer(undefined, { type: null });
    expect(result).toEqual(constants.INITIAL_STATE);
  });

  it('game start', () => {
    const output = {
      status: constants.APP_STATUS.LOADING,
      numPlayers: 4,
      deckId: null,
      error: null,
    };
    const action = { type: constants.GAME_START, payload: 4 };
    const result = reducer(undefined, action);
    expect(result).toEqual(output);
  });

  it('game ready', () => {
    const output = {
      status: constants.APP_STATUS.PLAY,
      numPlayers: 0,
      deckId: null,
      error: null,
    };
    const action = { type: constants.GAME_READY };
    const result = reducer(undefined, action);
    expect(result).toEqual(output);
  });

  it('game end', () => {
    const output = {
      status: constants.APP_STATUS.END,
      numPlayers: 0,
      deckId: null,
      error: null,
    };
    const action = { type: constants.GAME_END };
    const result = reducer(undefined, action);
    expect(result).toEqual(output);
  });

  it('game reset', () => {
    const output = {
      status: constants.APP_STATUS.WELCOME,
      numPlayers: 0,
      deckId: null,
      error: null,
    };
    const action = { type: constants.GAME_RESET };
    const result = reducer(undefined, action);
    expect(result).toEqual(output);
  });

  it('set deck id', () => {
    const output = {
      status: constants.APP_STATUS.WELCOME,
      numPlayers: 0,
      deckId: 'test_id',
      error: null,
    };
    const action = { type: constants.SET_DECK_ID, payload: 'test_id' };
    const result = reducer(undefined, action);
    expect(result).toEqual(output);
  });

  it('set error', () => {
    const error = { message: 'error' };
    const output = {
      status: constants.APP_STATUS.WELCOME,
      numPlayers: 0,
      deckId: null,
      error,
    };
    const action = { type: constants.SET_ERROR, payload: error };
    const result = reducer(undefined, action);
    expect(result).toEqual(output);
  });
});
