import { connect } from 'react-redux';
import BoardComponent from './Board';
import { getCards } from '../../modules/Player/playerSelectors';
import { addCardToTable, flushTable } from '../../modules/Player/playerActions';

const mapStateToProps = state => ({
  cards: getCards(state),
  table: state.player.table,
  numPlayers: state.app.numPlayers,
  score: state.player.score,
});

export default connect(mapStateToProps, { addCardToTable, flushTable })(BoardComponent);
