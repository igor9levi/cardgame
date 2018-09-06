export const playerWinsRound = ({ score, payload }) => {
  const { hand, player } = payload;
  score.map((item, index) => (index === player ? item[index].concat(hand) : item));
};

export const calculateRoundWinner = (table) => {
  // Todo: user value mapper
  const winnerCard = table.reduce((acc, next) => (next.value > acc.value ? next : acc), table[0]);
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
