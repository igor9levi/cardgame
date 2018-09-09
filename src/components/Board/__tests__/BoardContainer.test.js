import { mapStateToProps } from '../BoardContainer';

const state = {
  app: {
    numPlayers: 2,
  },
  player: {
    cards: [[{ testCard1: true }], [{ testCard2: true }]],
    score: [8, 8],
    table: [{ testCard3: true }],
  },
};

it('Test mapStateToProps', () => {
  const output = {
    numPlayers: 2,
    cards: [[{ testCard1: true }], [{ testCard2: true }]],
    score: [8, 8],
    table: [{ testCard3: true }],
  };
  expect(mapStateToProps(state)).toEqual(output);
});
