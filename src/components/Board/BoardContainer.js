import { connect } from 'react-redux';
import BoardComponent from './Board';
import { getCards } from '../../modules/Player/playerSelectors';
import { addCardToTable, flushTable } from '../../modules/Player/playerActions';
import { setEndStatus } from '../App/appActions';

export const mapStateToProps = state => ({
  cards: getCards(state),
  numPlayers: state.app.numPlayers,
  score: state.player.score,
  table: state.player.table,
});

export default connect(mapStateToProps, { addCardToTable, flushTable, setEndStatus })(BoardComponent);
