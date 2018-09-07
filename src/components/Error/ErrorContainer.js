import { connect } from 'redux';
import ErrorComponent from './Error';

const mapStateToProps = state => ({
  error: state.app.error,
});

export default connect(mapStateToProps(), {})(ErrorComponent);
