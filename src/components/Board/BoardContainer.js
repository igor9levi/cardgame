import { connect } from 'react-redux';
import BoardComponent from './Board';
import { getCards } from '../../modules/Player/playerSelectors';
import { getNumPlayers } from '../App/appSelectors';
import {
  addCardToTable, flushTable, setRoundWinner, unblockClick,
} from '../../modules/Player/playerActions';
import { setEndStatus } from '../App/appActions';

export const mapStateToProps = state => ({
  cards: getCards(state),
  numPlayers: getNumPlayers(state),
  score: state.player.score,
  table: state.player.table,
});

export default connect(mapStateToProps, {
  addCardToTable, setRoundWinner, setEndStatus, flushTable, unblockClick,
})(BoardComponent);
