export const START_GAME = 'START_GAME';

export const SET_DECK_ID = 'SET_DECK_ID';

export const APP_STATUS = {
  WELCOME: 1,
  PLAY: 2,
  END: 3,
}
export const NUM_ROUNDS = 10;
export const CARD_VALUE_MAPPER = {
  ACE: 14,
  KING: 13,
  QUEEN: 12,
  JACK: 11,
  10: 10,
  9: 9,
  8: 8,
  7: 7,
  6: 6,
  5: 5,
  4: 4,
  3: 3,
  2: 2,
};
export const SUIT_MAPPER = {
  SPADES: 1,
  DIAMONDS: 2,
  HEARTS: 3,
  CLUBS: 4,
};

export const INITIAL_STATE = {
  status: APP_STATUS.WELCOME,
  numPlayers: 0,
  deckId: null,
  players: [],
};
