import { CARD_VALUE_MAPPER, HUMAN_PLAYER_ID } from '../components/App/appConstants';

export const calculateRoundWinner = table => table.reduce((acc, next) => (
  CARD_VALUE_MAPPER[next.value.toUpperCase()] >= CARD_VALUE_MAPPER[acc.value.toUpperCase()] ? next : acc
), table[0]);

export const calculateTablePosition = ({ playerId, cardHeight = 50 }) => {
  switch (playerId) {
    case 0:
      return {
        left: 0,
        top: cardHeight,
      };
    case 1:
      return {
        left: -cardHeight,
        top: 0,
      };
    case 2:
      return {
        left: 0,
        top: -cardHeight,
      };
    case 3:
      return {
        left: cardHeight,
        top: 0,
      };
    default:
      return {
        left: 0,
        top: 0,
      };
  }
};

export const cardMoveDirection = ({ playerId, top, left }) => {
  switch (playerId) {
    case 0:
      return {
        left,
        top: 1000,
      };
    case 1:
      return {
        left: -1000,
        top,
      };
    case 2:
      return {
        left,
        top: -1000,
      };
    case 3:
      return {
        left: 1000,
        top,
      };
    default:
      return {};
  }
};

export const updateScore = ({ player, score }) => score.map((item, i) => (i === player ? item + 1 : item));

export const removeCardsFromPlayer = ({ cards, table }) => cards.map(
  player => player.filter(
    card => !table.map(item => item.code.toUpperCase()).includes(card.code.toUpperCase()),
  ),
);

export const shouldPlayRound = ({
  table, oldTable, playersTurn, oldPlayersTurn,
}) => (((table.length !== oldTable.length) && (table.length === 0)) || playersTurn[0] !== oldPlayersTurn[0]);

export const gameEnd = (cards) => {
  const flat = cards.reduce((acc, val) => acc.concat(val), []);

  return flat.length === 0;
};

export const getCenter = (node) => {
  const centerX = node.offsetLeft + node.offsetWidth / 2;
  const centerY = node.offsetTop + node.offsetHeight / 2;
  const center = {
    centerX,
    centerY,
  };

  return center;
};


// Todo: bullet proof rapid click
export const checkBlock = ({ player, playersTurn }) => {
  if (player !== HUMAN_PLAYER_ID) {
    return true;
  }

  return playersTurn[0] !== HUMAN_PLAYER_ID;
};
