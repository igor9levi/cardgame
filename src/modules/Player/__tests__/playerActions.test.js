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
    const output = {
      type: 'FLUSH_TABLE',
    };
    expect(actions.flushTable()).toEqual(output);
  });
});

describe('Test blockClick', () => {
  it('Returns correct action', () => {
    const output = {
      type: 'BLOCK_CLICK',
    };
    expect(actions.blockClick()).toEqual(output);
  });
});

describe('Test unblockClick', () => {
  it('Returns correct action', () => {
    const output = {
      type: 'UNBLOCK_CLICK',
    };
    expect(actions.unblockClick()).toEqual(output);
  });
});

describe('Test setRoundWinner', () => {
  it('Returns correct action', () => {
    const output = {
      type: 'SET_ROUND_WINNER',
      payload: 1
    };
    expect(actions.setRoundWinner(1)).toEqual(output);
  });
});
