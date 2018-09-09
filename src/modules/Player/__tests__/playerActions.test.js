import * as actions from '../playerActions';

describe('Test addCardToTable', () => {
  it('Returns correct action', () => {
    const input = {
      test: true,
    };
    const output = {
      type: 'ADD_CARD_TO_TABLE',
      payload: input,
    };
    expect(actions.addCardToTable(input)).toEqual(output);
  });
});

describe('Test flushTable', () => {
  it('Returns correct action', () => {
    const input = {
      test: true,
    };
    const output = {
      type: 'FLUSH_TABLE',
      payload: input,
    };
    expect(actions.flushTable(input)).toEqual(output);
  });
});
