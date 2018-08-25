import { connect } from 'redux';
import { setNumPlayers } from '../App/appActions';
import WelcomeComponent from './Welcome';

export default connect(null, { setNumPlayers })(WelcomeComponent)
