import { connect } from 'react-redux';
import ErrorComponent from './Error';
import { setWelcomeStatus } from '../App/appActions';
import { getError } from '../App/appSelectors';

export const mapStateToProps = state => ({
  error: getError(state),
});

export default connect(mapStateToProps, { setWelcomeStatus })(ErrorComponent);
