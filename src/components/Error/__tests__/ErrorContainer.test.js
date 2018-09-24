import { mapStateToProps } from '../ErrorContainer';

const state = {
  app: {
    error: true,
  },
};

describe('Test ErrorContainer', () => {
  it('Test mapStateToProps', () => {
    const output = {
      error: true,
    };
    expect(mapStateToProps(state)).toEqual(output);
  });
});
