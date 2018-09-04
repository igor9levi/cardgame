import * as actionConstants from './appConstants';

export const setNumPlayers = numPlayers => ({
  type: actionConstants.SET_NUM_PLAYERS,
  payload: numPlayers,
});
