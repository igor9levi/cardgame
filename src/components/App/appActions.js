import * as actionConstants from './actionConstants';

export const setNumPlayers = (numPlayers) => {
    type: actionConstants.SET_NUM_PLAYERS,
    payload: numPlayers,
}