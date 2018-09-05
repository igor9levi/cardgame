import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css';
import { APP_STATUS } from './appConstants';
import Board from '../Board';
import Welcome from '../Welcome';
import ScoreBoard from '../ScoreBoard';

export class App extends Component {
  renderApp = () => {
    const { status } = this.props;

    if (status === APP_STATUS.WELCOME) {
      return <Welcome />;
    }

    if (status === APP_STATUS.PLAY) {
      return <Board />;
    }

    return <ScoreBoard />;
  }

  render() {
    return (
      <div className="App">
        {this.renderApp()}
      </div>
    );
  }
}

App.propTypes = {
  status: PropTypes.number.isRequired,
};

export default App;
