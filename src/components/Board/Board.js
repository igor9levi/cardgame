import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import './Board.css';
import Card from './Card';
import {calculateRoundWinner} from '../../helpers/roundHelpers';

class Board extends PureComponent {
  static propTypes = {
    cards: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.object)).isRequired,
    numPlayers: PropTypes.number.isRequired,
    table: PropTypes.arrayOf(PropTypes.object),
    score: PropTypes.arrayOf(PropTypes.number),
    addCardToTable: PropTypes.func.isRequired,
    flushTable: PropTypes.func.isRequired,
  }

  static defaultProps = {
    table: [],
    score: [],
  }

  constructor(props) {
    super(props);
    this.initialState = {
      center: {},
    };
    this.state = this.initialState;

    this.playerTurns = [...Array(props.numPlayers).keys()];

    this.refTable = React.createRef();
    props.cards.map(item => item.map((card) => {
      const ref = React.createRef();
      this[card.code] = ref;
      return ref;
    }));
  }

  componentDidMount() {
    const center = this.getCenter();
    this.setState({
      center,
    });
  }

  shufflePlayers = () => {
    const { playerTurns } = this;
    this.playerTurns = playerTurns.slice(1).concat(playerTurns[0]);
  }

  computerPlay = () => {
    const { cards, addCardToTable } = this.props;
    const { playerTurns } = this;

    // Todo: pick random number between 0 and playerTurns[0].length-1
    const randomNumber = 5;
    const card = cards[playerTurns[0]][randomNumber];
    const { playerId, value, code } = card;
    addCardToTable({ playerId, value, code });
  }

  startNewRound = () => {
    // Todo: calculate round winner, update player score (winnerCard.playerId), dispatch flush table
    const winnerCard = calculateRoundWinner(this.props.table);
    this.props.flushTable();
  }

  playRounds = () => {
    this.shufflePlayers();

    while (this.playerTurns[0] !== 0) {
      this.computerPlay();
      if (this.props.table.length === this.props.numPlayers) {
        this.startNewRound();
        if (this.props.cards.length === 0) {
          // Todo: Dispatch end game
        }
      } else {
        this.shufflePlayers();
      }
    }
  }

  renderPlayer = ({ cards, player }) => {
    if (!cards || !cards[player]) return null;

    const { center } = this.state;

    return cards[player].map(card => (
      <Card
        reference={this[card.code]}
        key={card.code}
        code={card.code}
        alt={card.value}
        src={card.image}
        center={center}
        value={card.value}
        playerId={card.playerId}
        playRounds={this.playRounds}
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

    // Todo: add show each individual score
    return (
      <div className="wrapper">
        <div className="top-row">
          {this.renderPlayer({ player: 2, cards })}
        </div>
        <div className="middle-row">
          <div className="player player-left">
            {this.renderPlayer({ player: 1, cards })}
          </div>
          <div className="player table" ref={this.refTable} />
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
