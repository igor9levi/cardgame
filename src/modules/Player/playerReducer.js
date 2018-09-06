import * as constants from './playerConstants';
import { GAME_START } from '../../components/App/appConstants';
import { playerWinsRound } from '../../helpers/roundHelpers';

export default (state = constants.INITIAL_STATE, action) => {
  switch (action.type) {
    case GAME_START:
      return {
        ...state,
        score: [...Array(action.payload)].map(() => 0),
      };
    case constants.SET_CARDS:
      return {
        ...state,
        cards: action.payload,
      };
    case constants.ADD_CARD_TO_TABLE:
      return {
        ...state,
        table: [...state.table, action.payload],
      };
    case constants.FLUSH_TABLE:
      return {
        ...state,
        table: [],
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
