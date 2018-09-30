import * as actions from '../appActions';
import * as appConstants from '../appConstants';
import * as playerConstants from '../../../modules/Player/playerConstants';
import provider from '../../../modules/api/ApiProvider';

const cardsFromApi = [];
for (let i = 0; i < 21; i++) { cardsFromApi.push({}); }
provider.getDeck = jest.fn(() => 'deck_id');
provider.getCards = jest.fn(() => Promise.resolve(cardsFromApi));

describe('Test appActions', () => {
  describe('Test setWelcomeStatus', () => {
    it('Returns correct action', () => {
      const expectedOutput = {
        type: appConstants.GAME_RESET,
      };
      const result = actions.setWelcomeStatus();
      expect(result).toEqual(expectedOutput);
    });
  });

  describe('Test setPlayStatus', () => {
    it('Returns correct action', () => {
      const expectedOutput = {
        type: appConstants.GAME_READY,
      };
      const result = actions.setPlayStatus();
      expect(result).toEqual(expectedOutput);
    });
  });

  describe('Test setEndStatus', () => {
    it('Returns correct action', () => {
      const expectedOutput = {
        type: appConstants.GAME_END,
      };
      const result = actions.setEndStatus();
      expect(result).toEqual(expectedOutput);
    });
  });

  describe('Test setNumPlayers', () => {
    it('Returns correct action', () => {
      const numPlayers = 4;
      const expectedOutput = {
        type: appConstants.GAME_START,
        payload: numPlayers,
      };
      const result = actions.setNumPlayers(numPlayers);
      expect(result).toEqual(expectedOutput);
    });
  });

  describe('Test setError', () => {
    it('Returns correct action', () => {
      const error = { message: 'error' };
      const expectedOutput = {
        type: appConstants.SET_ERROR,
        payload: error,
      };
      const result = actions.setError(error);
      expect(result).toEqual(expectedOutput);
    });
  });

  describe('Test setDeck', () => {
    it('Returns correct action', () => {
      const deckId = { deckId: 'test_id' };
      const expectedOutput = {
        type: appConstants.SET_DECK_ID,
        payload: deckId.deckId,
      };
      const result = actions.setDeck(deckId);
      expect(result).toEqual(expectedOutput);
    });
  });

  describe('Test setCards', () => {
    it('Returns correct action', () => {
      const cards = { cards: [] };
      const expectedOutput = {
        type: playerConstants.SET_CARDS,
        payload: cards.cards,
      };
      const result = actions.setCards(cards);
      expect(result).toEqual(expectedOutput);
    });
  });

  describe('Test getDeck', () => {
    it('calls provider method getDeck', () => {
      actions.getDeck();
      expect(provider.getDeck).toBeCalled();
    });
  });

  describe('Test getCards', () => {
    it('calls provider method getCards', async () => {
      const numPlayers = 2;
      const inputParams = { deckId: 'deck_id', numPlayers };
      const outputParams = {
        deckId: 'deck_id',
        numCards: numPlayers * appConstants.NUM_ROUNDS,
      };
      const result = await actions.getCards(inputParams);
      expect(provider.getCards).toBeCalled();
      expect(provider.getCards).toHaveBeenCalledWith(outputParams);
      expect(result.length).toEqual(numPlayers);
      expect(result[0].length).toEqual(appConstants.NUM_ROUNDS);
      expect(result[1].length).toEqual(appConstants.NUM_ROUNDS);
      expect(result[0][0]).toHaveProperty('playerId');
    });
  });

  describe('Test startGame', () => {
    it('returns function', () => {
      const result = actions.startGame();
      expect(typeof result).toEqual('function');
    });

    it('returns function', async () => {
      const dispatch = jest.fn();
      const result = actions.startGame();
      await result(dispatch);
      expect(dispatch).toBeCalled();
      expect(dispatch).toHaveBeenCalledTimes(4);
    });
  });
});
