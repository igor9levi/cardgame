import * as constants from './playerConstants';
import { GAME_START } from '../../components/App/appConstants';
import { playerWinsRound, removeCardsFromPlayer, updateScore } from '../../helpers/roundHelpers';

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
    case constants.SET_ROUND_WINNER:
      return {
        ...state,
        winner: action.payload,
      };
    case constants.BLOCK_CLICK:
      return {
        ...state,
        block: true,
      };
    case constants.UNBLOCK_CLICK:
      return {
        ...state,
        block: false,
      };
    case constants.FLUSH_TABLE:
      return {
        ...state,
        cards: removeCardsFromPlayer({ cards: state.cards, table: state.table }),
        table: [],
        score: updateScore({ player: state.winner, score: state.score }),
        winner: null,
      };
    default:
      return state;
  }
};
