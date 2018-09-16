import { connect } from 'react-redux';
import { addCardToTable, flushTable } from '../../../modules/Player/playerActions';
import CardComponent from './Card';

const mapStateToProps = state => ({
  table: state.player.table,
  winner: state.player.winner,
});

export default connect(mapStateToProps, { addCardToTable, flushTable })(CardComponent);
