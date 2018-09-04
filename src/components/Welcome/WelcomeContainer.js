import { connect } from 'react-redux';
import { startGame } from '../App/appActions';
import WelcomeComponent from './Welcome';

export default connect(null, { startGame })(WelcomeComponent);
