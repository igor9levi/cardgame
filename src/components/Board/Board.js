import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './Board.css';
import Card from './Card';

class Board extends PureComponent {
  static propTypes = {
    cards: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.object)).isRequired,
  }

  constructor(props) {
    super(props);
    this.refTable = React.createRef();
    this.initialState = { center: null };
    this.state = this.initialState;
  }

  componentDidMount() {
    const center = this.getCenter();
    this.setState({
      center,
    });
  }

  renderPlayer = ({ cards, player }) => {
    if (!cards || !cards[player]) return null;

    const { center } = this.state;

    return cards[player].map(card => (
      <Card
        key={card.code}
        alt={card.value}
        src={card.image}
        center={center}
        playerId={card.playerId}
      />
    ));
  }

  getCenter = () => {
    const node = this.refTable.current;
    const centerX = node.offsetLeft + node.offsetWidth / 2;
    const centerY = node.offsetTop + node.offsetHeight / 2;
    const center = {
      centerX,
      centerY,
    };

    return center;
  }

  render() {
    const { cards } = this.props;

    return (
      <div className="wrapper">
        <div className="top-row">
          {this.renderPlayer({ player: 2, cards })}
        </div>
        <div className="middle-row">
          <div className="player player-left">
            {this.renderPlayer({ player: 1, cards })}
          </div>
          <div className="player table" ref={this.refTable}>Table</div>
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
