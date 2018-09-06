import { connect } from 'react-redux';
import { addCardToTable } from '../../../modules/Player/playerActions';
import CardComponent from './Card';

const mapStateToProps = state => ({
  table: state.player.table,
})

export default connect(mapStateToProps, { addCardToTable })(CardComponent);