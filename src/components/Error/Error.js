import React from 'react';
import PropTypes from 'prop-types';

export const Error = ({ error, setWelcomeStatus }) => (
  <div>
    <div>
      Error Happened!
    </div>
    <p>{error.message}</p>
    <button id="try-again" type="button" onClick={setWelcomeStatus}>Try Again!</button>
  </div>
);

Error.propTypes = {
  error: PropTypes.object,
  setWelcomeStatus: PropTypes.func.isRequired,
};

export default Error;
