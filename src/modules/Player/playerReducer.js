import * as constants from './playerConstants';
import { playerWinsRound } from '../../helpers/roundHelpers';

export default (state = constants.INITIAL_STATE, action) => {
  switch (action.type) {
    case constants.SET_CARDS:
      return {
        ...state,
        cards: action.payload,
      };
    case constants.SET_ROUND_WINNER:
      return {
        ...state,
        score: playerWinsRound({ score: state.score, payload: action.payload }),
      };
    default:
      return state;
  }
};
