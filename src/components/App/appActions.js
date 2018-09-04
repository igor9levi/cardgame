import * as actionConstants from './appConstants';

export const setNumPlayers = numPlayers => ({
  type: actionConstants.START_GAME,
  payload: numPlayers,
});
