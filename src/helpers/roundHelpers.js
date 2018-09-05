export const playerWinsRound = ({ score, payload }) => {
  const { hand, player } = payload;
  score.map((item, index) => (index === player ? item[index].concat(hand) : item));
};
