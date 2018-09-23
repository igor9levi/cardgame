import { mapStateToProps } from '../ScoreBoardContainer';

const state = {
  player: {
    score: [8, 8],
  },
};

describe('Test ScoreBoardContainer', () => {
  it('Test mapStateToProps', () => {
    const output = {
      score: [8, 8],
    };
    expect(mapStateToProps(state)).toEqual(output);
  });
});
