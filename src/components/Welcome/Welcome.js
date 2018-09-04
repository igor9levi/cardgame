import React from 'react';
import PropTypes from 'prop-types';

export const Welcome = ({setNumPlayers}) => (
  <div>
    <h1 className="welcome-message">Hello! Please choose number of players</h1>
    <button
      type="button"
      onClick={() => {
        setNumPlayers(2);
      }}
    >
      Two Players
    </button>
    <button
      type="button"
      onClick={() => {
        setNumPlayers(3);
      }}
    >
      Three Players
    </button>
    <button
      type="button"
      onClick={() => {
        setNumPlayers(4);
      }}
    >
      Four Players
    </button>
  </div>
);

Welcome.propTypes = {
  setNumPlayers: PropTypes.func.isRequired,
};

export default Welcome;
