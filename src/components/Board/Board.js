import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './Board.css';
import Card from './Card';

class Board extends PureComponent {
  static propTypes = {
    cards: PropTypes.arrayOf(PropTypes.object).isRequired,
  }

  renderPlayer = ({ cards, player }) => {
    if (!cards || !cards[player]) return null;

    return cards[player].map(card => (
      <Card
        key={card.code}
        alt={card.value}
        src={card.image}
      />
    ));
  }

  render() {
    const { cards } = this.props;

    // return (
    //   <div className="board">
    //     {/* <div className="player"> */}
    //     {this.renderPlayer(cards)}
    //     {/* </div> */}
    //   </div>
    // );
    return (
      <div className="wrapper">
        <div className="top-row">
          {this.renderPlayer({ player: 2, cards })}
        </div>
        <div className="middle-row">
          <div className="player player-left">
            {this.renderPlayer({ player: 1, cards })}
          </div>
          <div className="player table">Table</div>
          <div className="player player-right">
            {this.renderPlayer({ player: 3, cards })}
          </div>
        </div>
        <div className="bottom-row">
          {this.renderPlayer({ player: 0, cards })}
        </div>
      </div>
    );
  }
}

export default Board;
