import { CARD_VALUE_MAPPER } from '../components/App/appConstants';

export const calculateRoundWinner = (table) => {
  const winnerCard = table.reduce((acc, next) => (
    CARD_VALUE_MAPPER[next.value.toUpperCase()] >= CARD_VALUE_MAPPER[acc.value.toUpperCase()] ? next : acc
  ), table[0]);
  return winnerCard;
};

export const calculateTablePosition = ({ playerId, cardHeight }) => {
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

export const updateScore = ({ player, score }) => score.map((item, i) => (i === player ? item + 1 : item));

export const removeCardsFromPlayer = ({ cards, table }) => cards.map(
  player => player.filter(
    card => !table.map(item => item.code.toUpperCase()).includes(card.code.toUpperCase()),
  ),
);
