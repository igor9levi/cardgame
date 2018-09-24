import React from 'react';
import PropTypes from 'prop-types';

export const Welcome = ({ startGame }) => (
  <div className="welcome-container">
    <h1 className="welcome-message">Hello! Please choose number of players</h1>
    <button
      id="btn1"
      type="button"
      onClick={() => {
        startGame(2);
      }}
    >
      Two Players
    </button>
    <button
      id="btn2"
      type="button"
      onClick={() => {
        startGame(3);
      }}
    >
      Three Players
    </button>
    <button
      id="btn3"
      type="button"
      onClick={() => {
        startGame(4);
      }}
    >
      Four Players
    </button>
  </div>
);

Welcome.propTypes = {
  startGame: PropTypes.func.isRequired,
};

export default Welcome;
