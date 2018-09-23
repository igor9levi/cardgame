import React from 'react';
import PropTypes from 'prop-types';
import './ScoreBoard.css';

const ScoreBoard = ({ score, setWelcomeStatus }) => {
  const winner = score.indexOf(Math.max(...score));
  return (
    <div className="score-board-container">
      <h1>
        { `Finished! Player${winner} won!` }
      </h1>
      <p>Rest of the scores are</p>
      <div>
        {score.map((result, index) => (
          <div key={Math.random()}>
            {`Player${index}: ${result}`}
          </div>
        ))}
      </div>
      <button type="button" onClick={setWelcomeStatus}>Start new Game</button>
    </div>
  );
};

ScoreBoard.propTypes = {
  score: PropTypes.arrayOf(PropTypes.number).isRequired,
  setWelcomeStatus: PropTypes.func.isRequired,
};

export default ScoreBoard;
