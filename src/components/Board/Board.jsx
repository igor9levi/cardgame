import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Random from 'random-js';
import './Board.css';
import Card from './Card';
import { calculateRoundWinner } from '../../helpers/roundHelpers';
import { pause } from '../../helpers/animationHelpers';
import { HUMAN_PLAYER_ID } from '../App/appConstants';

class Board extends PureComponent {
  static propTypes = {
    cards: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.object)).isRequired,
    numPlayers: PropTypes.number.isRequired,
    table: PropTypes.arrayOf(PropTypes.object),
    score: PropTypes.arrayOf(PropTypes.number),
    addCardToTable: PropTypes.func.isRequired,
    flushTable: PropTypes.func.isRequired,
    setEndStatus: PropTypes.func.isRequired,
  }

  static defaultProps = {
    table: [],
    score: [],
  }

  constructor(props) {
    super(props);

    this.initialState = {
      center: {},
      playersTurn: [...Array(props.numPlayers).keys()],
    };
    this.state = this.initialState;
    this.refTable = React.createRef();
    this.purgatory = [];
  }

  componentDidMount() {
    this.setState({
      center: this.getCenter(),
    });
  }

  componentDidUpdate(prevProps, prevState) {
    console.warn('cdu: ', this.state.playersTurn[0], prevState.playersTurn[0])
    if (this.gameEnd()) {
      return this.props.setEndStatus();
    }

    if ((this.props.table.length !== prevProps.table.length) && (this.props.table.length === 0)) {
      return this.playRound();
    }

    if (this.state.playersTurn[0] !== prevState.playersTurn[0]) {
      return this.playRound();
    }
  }

  gameEnd = () => {
    const { cards } = this.props;
    const flat = cards.reduce((acc, val) => acc.concat(val), []);
    return flat.length === 0;
  }

  shufflePlayers = () => {
    const { playersTurn } = this.state;
    const test = playersTurn.slice(1).concat(playersTurn[0])
    console.warn('shuffle: ', test, playersTurn)
    this.setState({
      playersTurn: test,
    });
  }

  playRound = async () => {
    const {
      cards, addCardToTable, table, numPlayers,
    } = this.props;
    const { playersTurn } = this.state;

    if (table.length === numPlayers) {
      return this.resetRound();
    }

    if (playersTurn[0] === HUMAN_PLAYER_ID) return; // Todo: unblock player

    const max = cards[playersTurn[0]].length - 1;
    const randomNumber = Random.integer(0, max)(Random.engines.nativeMath);
    const card = cards[playersTurn[0]][randomNumber];
    const { playerId, value, code } = card;

    await pause(200);
    addCardToTable({ playerId, value, code });
  }

  setWinnerToPlay = (winner) => {
    const { playersTurn } = this.state;
    let tempPlayers = playersTurn;
    while (tempPlayers[0] !== winner) {
      tempPlayers = tempPlayers.slice(1).concat(tempPlayers[0]);
    }

    this.setState({
      playersTurn: tempPlayers,
    });
  }

  resetRound = () => {
    const { playerId } = calculateRoundWinner(this.props.table);
    this.setWinnerToPlay(playerId);
    this.props.setRoundWinner(playerId);
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

  // Todo: refactor remove cards
  removeCards = () => {}

  removeCard = (cardId) => {
    let inside = false;

    this.props.cards.map(player => player.map((card) => {
      if (card.code === cardId) {
        inside = true;
      }
    }));

    if (!inside) return;

    if (!(this.purgatory.includes(cardId))) {
      this.purgatory.push(cardId);
    }

    if (this.purgatory.length === this.props.cards.length) {
      this.purgatory = [];
      return this.props.flushTable();
    }
  }


  checkBlock = ({ player, playersTurn }) => {
    if (player !== HUMAN_PLAYER_ID) {
      return true;
    }

    return playersTurn[0] !== HUMAN_PLAYER_ID;
  }

  renderPlayer = ({ cards, player }) => {
    if (!cards || !cards[player]) return null;

    const { center, playersTurn } = this.state;

    return cards[player].map((card) => {
      const props = {
        key: card.code,
        code: card.code,
        alt: card.value,
        src: card.image,
        center,
        value: card.value,
        playerId: card.playerId,
        playRounds: this.playRounds,
        animationFinished: this.shufflePlayers,
        blockClick: this.checkBlock({ player, playersTurn }),
        removeCard: this.removeCard,
      };

      return (
        <Card {...props} />
      );
    });
  }

  render() {
    const { cards, score } = this.props;

    return (
      <div className="wrapper">
        <div className="player player-left">
          <p>
           Score:
            {score[1]}
          </p>
          {this.renderPlayer({ player: 1, cards })}
        </div>
        <div className="middle-row">
          <div>
            <div className="top-row">
              <p>
             Score:
                {score[2]}
              </p>
              {this.renderPlayer({ player: 2, cards })}
            </div>
            <div className="player table" ref={this.refTable} />
            <div className="bottom-row">
              <p>
             Score:
                {score[0]}
              </p>
              {this.renderPlayer({ player: 0, cards })}
            </div>
          </div>
        </div>
        <div className="player player-right">
          <p>
           Score:
            {score[3]}
          </p>
          {this.renderPlayer({ player: 3, cards })}
        </div>
      </div>
    );
  }
}

export default Board;
