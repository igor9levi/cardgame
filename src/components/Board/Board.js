import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './Board.css';
import Card from './Card';

class Board extends PureComponent {
  static propTypes = {
    cards: PropTypes.arrayOf(PropTypes.object).isRequired,
  }

  renderPlayer = (cards) => {
    if (!cards) return null;

    console.warn(this.props);
    return cards.map(card => (
      <Card
        key={card.code}
        alt={card.value}
        src={card.image}
      />
    ));
  }

  render() {
    const { cards } = this.props;

    return (
      <div className="board">
        {/* <div className="player"> */}
        {this.renderPlayer(cards)}
        {/* </div> */}
      </div>
    );
  }
}

export default Board;
