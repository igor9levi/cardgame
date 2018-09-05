import { connect } from 'react-redux';
import BoardComponent from './Board';
import { getCards } from '../../modules/Player/playerSelectors';

const mapStateToProps = state => ({
  cards: getCards(state),
});

export default connect(mapStateToProps, null)(BoardComponent);
