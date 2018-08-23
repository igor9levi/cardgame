import React, { Component } from 'react';

export class Welcome extends Component {
    render() {
        return (
            <div>
                <button>Two Players</button>
                <button>Three Players</button>
                <button>Four Players</button>
            </div>
        );
    }
}

export default Welcome;
