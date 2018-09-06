import * as constants from './playerConstants';

export const setRoundWinner = () => ({
  type: constants.SET_ROUND_WINNER,
  payload: {},
});

export const addCardToTable = card => ({
  type: constants.ADD_CARD_TO_TABLE,
  payload: card,
});

export const flushTable = () => ({
  type: constants.FLUSH_TABLE,
});
