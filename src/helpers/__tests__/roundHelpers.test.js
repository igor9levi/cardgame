import * as helpers from '../roundHelpers';
import {HUMAN_PLAYER_ID} from "../../components/App/appConstants";

describe('Test calculateRoundWinner', () => {
  it('king wins round all cards different, not all caps', () => {
    const input = [
      { value: 'JACK', playerId: 0 },
      { value: '10', playerId: 1 },
      { value: 'KING', playerId: 2 },
      { value: 'ace', playerId: 3 },
    ];
    const output = { value: 'KING', playerId: 2 };
    expect(helpers.calculateRoundWinner(input)).toEqual(output);
  });

  it('last king wins round all cards same, not all caps', () => {
    const input = [
      { value: 'KING', playerId: 0 },
      { value: 'king', playerId: 1 },
      { value: 'king', playerId: 2 },
      { value: 'KING', playerId: 3 },
    ];
    const output = { value: 'KING', playerId: 3 };
    expect(helpers.calculateRoundWinner(input)).toEqual(output);
  });
});

describe('Test calculateTablePosition', () => {
  it('position for player 0', () => {
    const input = { playerId: 0, cardHeight: 10 };
    const result = {
      left: 0,
      top: 10,
    };
    expect(helpers.calculateTablePosition(input)).toEqual(result);
  });

  it('position for player 1', () => {
    const input = { playerId: 1, cardHeight: 10 };
    const output = {
      left: -10,
      top: 0,
    };
    expect(helpers.calculateTablePosition(input)).toEqual(output);
  });

  it('position for player 2', () => {
    const input = { playerId: 2, cardHeight: 10 };
    const output = {
      left: 0,
      top: -10,
    };
    expect(helpers.calculateTablePosition(input)).toEqual(output);
  });

  it('position for player 3', () => {
    const input = { playerId: 3, cardHeight: 10 };
    const output = {
      left: 10,
      top: 0,
    };
    expect(helpers.calculateTablePosition(input)).toEqual(output);
  });

  it('position for default', () => {
    const input = { playerId: 100, cardHeight: 10 };
    const output = {
      left: 0,
      top: 0,
    };
    expect(helpers.calculateTablePosition(input)).toEqual(output);
  });
});

describe('Test cardMoveDirection', () => {
  it('position for player 0', () => {
    const input = { playerId: 0, left: 500, top: 500 };
    const result = {
      left: 500,
      top: 2000,
    };
    expect(helpers.cardMoveDirection(input)).toEqual(result);
  });

  it('position for player 1', () => {
    const input = { playerId: 1, left: 500, top: 500 };

    const output = {
      left: -2000,
      top: 500,
    };
    expect(helpers.cardMoveDirection(input)).toEqual(output);
  });

  it('position for player 2', () => {
    const input = { playerId: 2, left: 500, top: 500 };

    const output = {
      left: 500,
      top: -2000,
    };
    expect(helpers.cardMoveDirection(input)).toEqual(output);
  });

  it('position for player 3', () => {
    const input = { playerId: 3, left: 500, top: 500 };

    const output = {
      left: 2000,
      top: 500,
    };
    expect(helpers.cardMoveDirection(input)).toEqual(output);
  });

  it('position for default', () => {
    const input = { playerId: 100, cardHeight: 10 };
    const output = {};
    expect(helpers.cardMoveDirection(input)).toEqual(output);
  });
});

describe('Test updateScore', () => {
  it('returns ', () => {
    const score = [0, 0, 0];
    const player = 1;
    const result = helpers.updateScore({ score, player });
    expect(result).toEqual([0, 1, 0]);
  });
});

describe('Test removeCardsFromPlayer', () => {
  it('', () => {
    const input = {
      cards: [
        [
          { value: 'QUEEN', playerId: 0, code: 'QH' },
          { value: '10', playerId: 0, code: '0H' },
          { value: 'KING', playerId: 0, code: 'kh' },
          { value: '3', playerId: 0, code: '3H' },
        ], [
          { value: 'QUEEN', playerId: 1, code: 'QC' },
          { value: '10', playerId: 1, code: '0C' },
          { value: 'KING', playerId: 1, code: 'kC' },
          { value: '3', playerId: 1, code: '3C' },
        ], [
          { value: 'QUEEN', playerId: 2, code: 'QS' },
          { value: '10', playerId: 2, code: '0S' },
          { value: 'KING', playerId: 2, code: 'kS' },
          { value: '3', playerId: 2, code: '3S' },
        ], [
          { value: 'QUEEN', playerId: 3, code: 'QD' },
          { value: '10', playerId: 3, code: '0D' },
          { value: 'KING', playerId: 3, code: 'kd' },
          { value: '3', playerId: 3, code: '3D' },
        ],
      ],
      table: [
        { value: 'QUEEN', playerId: 0, code: 'qH' },
        { value: '10', playerId: 1, code: '0c' },
        { value: 'KING', playerId: 2, code: 'KS' },
        { value: '3', playerId: 3, code: '3D' },
      ],
    };
    const output = [
      [
        { value: '10', playerId: 0, code: '0H' },
        { value: 'KING', playerId: 0, code: 'kh' },
        { value: '3', playerId: 0, code: '3H' },
      ], [
        { value: 'QUEEN', playerId: 1, code: 'QC' },
        { value: 'KING', playerId: 1, code: 'kC' },
        { value: '3', playerId: 1, code: '3C' },
      ], [
        { value: 'QUEEN', playerId: 2, code: 'QS' },
        { value: '10', playerId: 2, code: '0S' },
        { value: '3', playerId: 2, code: '3S' },
      ], [
        { value: 'QUEEN', playerId: 3, code: 'QD' },
        { value: '10', playerId: 3, code: '0D' },
        { value: 'KING', playerId: 3, code: 'kd' },
      ],
    ];
    expect(helpers.removeCardsFromPlayer(input)).toEqual(output);
  });
});

describe('Test getCenter', () => {
  it('returns center position', () => {
    const node = {
      offsetLeft: 2, offsetWidth: 2, offsetTop: 2, offsetHeight: 2,
    };
    const output = {
      centerX: 3,
      centerY: 3,
    };
    const result = helpers.getCenter(node);
    expect(result).toEqual(output);
  });
});

describe('Test checkBlock ', () => {
  it('if player is not human, should be blocked', () => {
    const input = { player: 2, playersTurn: [0, 1, 2] };
    const result = helpers.checkBlock(input);
    expect(result).toEqual(true);
  });

  it('if player is human, and is not his turn to play, should be blocked', () => {
    const input = { player: HUMAN_PLAYER_ID, playersTurn: [1, 2, 0] };
    const result = helpers.checkBlock(input);
    expect(result).toEqual(true);
  });

  it('if player is not human, and is his turn to play, should NOT be blocked', () => {
    const input = { player: HUMAN_PLAYER_ID, playersTurn: [0, 1, 2] };
    const result = helpers.checkBlock(input);
    expect(result).toEqual(false);
  });
});
