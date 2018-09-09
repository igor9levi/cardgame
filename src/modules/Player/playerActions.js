import * as constants from './playerConstants';

export const addCardToTable = card => ({
  type: constants.ADD_CARD_TO_TABLE,
  payload: card,
});

export const flushTable = player => ({
  type: constants.FLUSH_TABLE,
  payload: player,
});
