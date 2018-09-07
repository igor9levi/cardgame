import * as playerConstants from '../../modules/Player/playerConstants';
import * as appConstants from './appConstants';
import * as selectors from './appSelectors';
import apiProvider from '../../modules/api/ApiProvider';

export const setWelcomeStatus = () => ({
  type: appConstants.GAME_RESET,
});

export const setPlayStatus = () => ({
  type: appConstants.GAME_READY,
});

export const setEndStatus = () => ({
  type: appConstants.GAME_END,
});

export const setNumPlayers = numPlayers => ({
  type: appConstants.GAME_START,
  payload: numPlayers,
});

export const setError = error => ({
  type: appConstants.SET_ERROR,
  payload: error,
});

export const setDeck = ({ deckId }) => ({
  type: appConstants.SET_DECK_ID,
  payload: deckId,
});

export const setCards = ({ cards }) => ({
  type: playerConstants.SET_CARDS,
  payload: cards,
});

export const getDeck = () => apiProvider.getDeck();

export const getCards = async ({ deckId, numPlayers }) => {
  const cards = [];
  const response = await apiProvider.getCards({ deckId, numCards: appConstants.NUM_ROUNDS * numPlayers });
  for (let i = 0; i < numPlayers; i++) {
    const cardsForOnePlayer = response.slice(i * appConstants.NUM_ROUNDS, ((i + 1) * appConstants.NUM_ROUNDS));
    const cardsWithPlayerId = cardsForOnePlayer.map(card => ({ ...card, playerId: i }));
    cards.push(cardsWithPlayerId);
  }

  return cards;
};

export const startGame = numPlayers => async (dispatch, getState) => {
  dispatch(setNumPlayers(numPlayers));
  try {
    const deckId = await getDeck();
    dispatch(setDeck({ deckId }));

    const cards = await getCards({ deckId, numPlayers: selectors.getNumPlayers(getState()) });
    dispatch(setCards({ cards }));
    dispatch(setPlayStatus());
  } catch (error) {
    dispatch(setError(error));
  }
};
