import { connect } from 'redux';
import { setNumPlayers } from '../App/appActions';
import WelcomeComponent from './Welcome';

const mapStateToProps = state => ({
    state,
})

const mapDispatchToProps = dispatch => ({
    setNumPlayers
})

export default connect(null, mapDispatchToProps)(WelcomeComponent)
