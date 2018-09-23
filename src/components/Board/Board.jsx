import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Random from 'random-js';
import './Board.css';
import Card from './Card';
import {
  calculateRoundWinner, checkBlock, gameEnd, getCenter, shouldPlayRound,
} from '../../helpers/roundHelpers';
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
    setRoundWinner: PropTypes.func.isRequired,
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
    const center = getCenter(this.refTable.current)
    this.setState({
      center,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { cards, setEndStatus, table } = this.props;
    const { table: oldTable } = prevProps;
    const { playersTurn } = this.state;
    const { playersTurn: oldPlayersTurn } = prevState;

    if (gameEnd(cards)) {
      return setEndStatus();
    }

    if (shouldPlayRound({
      table, oldTable, playersTurn, oldPlayersTurn,
    })) {
      return this.playRound();
    }
  }

  shufflePlayers = () => {
    const { playersTurn } = this.state;

    this.setState({
      playersTurn: playersTurn.slice(1).concat(playersTurn[0]),
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

    if (playersTurn[0] === HUMAN_PLAYER_ID) return false;

    const max = cards[playersTurn[0]].length - 1;
    const randomNumber = Random.integer(0, max)(Random.engines.nativeMath);
    const card = cards[playersTurn[0]][randomNumber];
    const { playerId, value, code } = card;

    await pause(500);
    return addCardToTable({ playerId, value, code });
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
    const { table, setRoundWinner } = this.props;
    const { playerId } = calculateRoundWinner(table);

    this.setWinnerToPlay(playerId);
    setRoundWinner(playerId);
  }


  removeCard = (cardId) => {
    const { cards, flushTable } = this.props;

    if (!(this.purgatory.includes(cardId))) {
      this.purgatory.push(cardId);
    }

    if (this.purgatory.length === cards.length) {
      this.purgatory = [];
      flushTable();
    }
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
        blockClick: checkBlock({ player, playersTurn }),
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
          { cards[1] && (
          <p>
           Score:
            {score[1]}
          </p>
          )}
          {this.renderPlayer({ player: 1, cards })}
        </div>
        <div className="middle-row">
          <div>
            <div className="top-row">
              { cards[2] && (
              <p>
             Score:
                {score[2]}
              </p>
              )}
              {this.renderPlayer({ player: 2, cards })}
            </div>
            <div className="player table" ref={this.refTable} />
            <div className="bottom-row">
              { cards[0] && (
              <p>
             Score:
                {score[0]}
              </p>
              )}
              {this.renderPlayer({ player: 0, cards })}
            </div>
          </div>
        </div>
        <div className="player player-right">
          { cards[3] && (
          <p>
           Score:
            {score[3]}
          </p>
          )}
          {this.renderPlayer({ player: 3, cards })}
        </div>
      </div>
    );
  }
}

export default Board;
