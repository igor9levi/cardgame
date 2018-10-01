import * as constants from './appConstants';

export default (state = constants.INITIAL_STATE, action) => {
  switch (action.type) {
    case constants.GAME_START:
      return {
        ...state,
        numPlayers: action.payload,
        status: constants.APP_STATUS.LOADING,
      };
    case constants.GAME_READY:
      return {
        ...state,
        status: constants.APP_STATUS.PLAY,
      };
    case constants.GAME_END:
      return {
        ...state,
        status: constants.APP_STATUS.END,
      };
    case constants.GAME_RESET:
      return {
        ...state,
        status: constants.APP_STATUS.WELCOME,
      };
    case constants.SET_DECK_ID:
      return {
        ...state,
        deckId: action.payload,
      };
    case constants.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        status: constants.APP_STATUS.ERROR,
      };
    default:
      return state;
  }
};
