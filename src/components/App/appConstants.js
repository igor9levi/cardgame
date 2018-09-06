export const NUM_ROUNDS = 10;
export const SET_DECK_ID = 'SET_DECK_ID';
export const GAME_START = 'GAME_START';
export const GAME_READY = 'GAME_READY';
export const GAME_END = 'GAME_END';
export const GAME_RESET = 'GAME_RESET';
export const GAME_LOADING = 'GAME_LOADING';
export const APP_STATUS = {
  WELCOME: 1,
  LOADING: 2,
  PLAY: 3,
  END: 4,
};
export const CARD_VALUE_MAPPER = {
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
  ACE: 1,
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
};
