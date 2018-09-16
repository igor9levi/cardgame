import * as constants from './playerConstants';

export const addCardToTable = card => ({
  type: constants.ADD_CARD_TO_TABLE,
  payload: card,
});

export const flushTable = () => ({
  type: constants.FLUSH_TABLE,
});

export const setRoundWinner = player => ({
  type: constants.SET_ROUND_WINNER,
  payload: player,
});
