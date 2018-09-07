import React from 'react';
import PropTypes from 'prop-types';

const ScoreBoard = ({ score }) => {
  const winner = score.indexOf(Math.max(...score));
  return (
    <div>
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
    </div>
  );
};

ScoreBoard.propTypes = {
  score: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default ScoreBoard;
