import { connect } from 'react-redux';
import AppComponent from './App';
import { getAppStatus } from './appSelectors';

const mapStateToProps = state => ({
  status: getAppStatus(state),
});

export default connect(mapStateToProps, null)(AppComponent);
