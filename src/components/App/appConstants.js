export const START_GAME = 'START_GAME';

export const SET_DECK_ID = 'SET_DECK_ID';

export const INITIAL_STATE = {
  numPlayers: 0,
  deckId: null,
  players: [],
};

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
  SPADES: 0,
  DIAMONDS: 1,
  HEARTS: 2,
  CLUBS: 3,
};
