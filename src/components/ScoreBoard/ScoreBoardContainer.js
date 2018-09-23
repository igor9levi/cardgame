import { connect } from 'react-redux';
import ScoreBoardComponent from './ScoreBoard';
import { setWelcomeStatus } from '../App/appActions';

export const mapStateToProps = state => ({
  score: state.player.score,
});

export default connect(mapStateToProps, { setWelcomeStatus })(ScoreBoardComponent);
