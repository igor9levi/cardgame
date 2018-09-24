import { mapStateToProps } from '../CardContainer';

const state = {
  player: {
    table: [{ testCard3: true }],
    winner: null,
    block: true,
  },
};

it('Test mapStateToProps', () => {
  const output = {
    table: [{ testCard3: true }],
    winner: null,
    block: true,
  };
  
  expect(mapStateToProps(state)).toEqual(output);
});