import React from 'react';
import PropTypes from 'prop-types';

export const Welcome = ({ startGame }) => (
  <div>
    <h1 className="welcome-message">Hello! Please choose number of players</h1>
    <button
      type="button"
      onClick={() => {
        startGame(2);
      }}
    >
      Two Players
    </button>
    <button
      type="button"
      onClick={() => {
        startGame(3);
      }}
    >
      Three Players
    </button>
    <button
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
