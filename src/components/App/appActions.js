import * as playerConstants from '../../modules/Player/playerConstants';
import * as actionConstants from './appConstants';
import * as selectors from './appSelectors';
import apiProvider from '../../modules/api/ApiProvider';

export const setNumPlayers = numPlayers => ({
  type: actionConstants.START_GAME,
  payload: numPlayers,
});

export const setDeck = ({ deckId }) => ({
  type: actionConstants.SET_DECK_ID,
  payload: deckId,
});

export const setCards = ({ cards }) => ({
  type: playerConstants.SET_CARDS,
  payload: cards,
});

export const getDeck = () => apiProvider.getDeck();
export const getCards = async ({ deckId, numPlayers }) => {
  const cards = [];

  const response = await apiProvider.getCards({ deckId, numCards: actionConstants.NUM_ROUNDS * numPlayers });
  for (let i = 0; i < numPlayers; i++) {
    const med = response.slice(i * actionConstants.NUM_ROUNDS, ((i + 1) * actionConstants.NUM_ROUNDS));
    cards.push(med);
  }

  return cards;
};

export const startGame = numPlayers => async (dispatch, getState) => {
  dispatch(setNumPlayers(numPlayers));
  const deckId = await getDeck();
  dispatch(setDeck({ deckId }));
  const cards = await getCards({ deckId, numPlayers: selectors.getNumPlayers(getState()) });
  dispatch(setCards({ cards }));
};
