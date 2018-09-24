import { mapStateToProps } from '../AppContainer';
import { GAME_READY } from '../appConstants';

const state = {
  app: {
    numPlayers: 2,
    status: GAME_READY,
  },
};

describe('Test AppContainer', () => {
  it('Test mapStateToProps', () => {
    const output = {
      status: GAME_READY,
    };
    expect(mapStateToProps(state)).toEqual(output);
  });
});
