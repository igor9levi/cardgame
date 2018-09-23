export const SET_CARDS = 'SET_CARDS';
export const ADD_CARD_TO_TABLE = 'ADD_CARD_TO_TABLE';
export const SET_ROUND_WINNER = 'SET_ROUND_WINNER';
export const FLUSH_TABLE = 'FLUSH_TABLE';
export const BLOCK_CLICK = 'BLOCK_CLICK';
export const UNBLOCK_CLICK = 'UNBLOCK_CLICK';

export const INITIAL_STATE = {
  cards: [],
  score: [],
  table: [],
  winner: null,
  block: false,
};
