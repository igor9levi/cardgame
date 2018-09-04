import * as actionConstants from './appConstants';
import apiProvider from '../../modules/api/ApiProvider';
import * as selectors from './appSelectors';

export const setNumPlayers = numPlayers => ({
  type: actionConstants.START_GAME,
  payload: numPlayers,
});

export const setDeck = ({ deckId }) => ({
  type: actionConstants.SET_DECK_ID,
  payload: deckId,
});

export const getDeck = () => apiProvider.getDeck();
export const getCards = ({ deckId, numPlayers }) => {
  // const cards = [];

  const cards = apiProvider.getCards({ deckId, numRounds: actionConstants.NUM_ROUNDS });
  console.warn('getCards: ', cards);

  return cards;

  // for (let i = 0; i < actionConstants.NUM_ROUNDS; i++) {
  //   for (let j = 0; j < numPlayers; j++) {
  //     const card = apiProvider.getCard(deckId);
  //     cards.concat(card);
  //   }
  // }
};

export const startGame = numPlayers => async (dispatch, getState) => {
  dispatch(setNumPlayers(numPlayers));
  const deckId = await getDeck();
  dispatch(setDeck({ deckId }));
  const cards = await getCards({ deckId, numPlayers: selectors.getNumPlayers(getState()) });
  console.warn('start game: ', cards);
  // dispatch(setCards(cards));
};
