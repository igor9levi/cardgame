import { combineReducers } from 'redux';
import appReducer from '../components/App/appReducer';
import playerReducer from '../modules/Player/playerReducer';

export default combineReducers({
  app: appReducer,
  player: playerReducer,
});
