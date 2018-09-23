import { connect } from 'react-redux';
import { addCardToTable, flushTable, blockClick } from '../../../modules/Player/playerActions';
import CardComponent from './Card';

const mapStateToProps = state => ({
  table: state.player.table,
  winner: state.player.winner,
  block: state.player.block,
});

export default connect(mapStateToProps, { addCardToTable, flushTable, blockClick })(CardComponent);
