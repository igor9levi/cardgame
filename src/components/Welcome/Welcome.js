import React from 'react';

export const Welcome = (props) => {

    return (
        <div>
            <h1 className="welcome-message">Hello! Please choose number of players</h1>
            <button 
            >Two Players</button>
            <button
             >Three Players</button>
            <button 
            >Four Players</button>
        </div>
    );
}

export default Welcome;
