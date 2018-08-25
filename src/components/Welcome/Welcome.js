import React, { Component } from 'react';

export const Welcome = (props) => {
 
    console.log('PROPSOVI: ', props)
    return (
        <div>
            <h1 className="welcome-message">Hello! Please choose number of players</h1>
            <button 
            // onClick={props.setNumPlayers(2)}
            >Two Players</button>
            <button
            //  onClick={props.setNumPlayers(3)}
             >Three Players</button>
            <button 
            // onClick={props.setNumPlayers(4)}
            >Four Players</button>
        </div>
    );
}

export default Welcome;
