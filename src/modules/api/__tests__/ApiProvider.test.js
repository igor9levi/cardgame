import provider from '../ApiProvider';

describe('Test ApiProvider', () => {
  describe('Test apiCall', () => {
    it('calls fetch', () => {
      const url = 'url.com';
      window.fetch = jest.fn();
      provider.apiCall({ url });
      expect(window.fetch).toBeCalled();
      expect(window.fetch).toHaveBeenCalledWith(url);
    });
  });

  describe('Test getDeck', () => {
    it('no success', async () => {
      let message = false;
      const deck = { success: false, deck_id: 1 }
      const stringify = jest.fn(() => Promise.resolve(deck))
      provider.apiCall = jest.fn(() => Promise.resolve({ json: stringify }))
      try {
        await provider.getDeck();
      } catch (err) {
        message = err.message;
      }
      expect(message).toBeTruthy();
      expect(message).toEqual('No success in fetching deck!');
    });

    it('has success and returns deck id', async () => {
      const deck = { success: true, deck_id: 1 };
      const stringify = jest.fn(() => Promise.resolve(deck));
      provider.apiCall = jest.fn(() => Promise.resolve({ json: stringify }));
      const result = await provider.getDeck();
      expect(result).toEqual(1);
    });
  });

  describe('Test getCards', () => {
    it('no success', async () => {
      let message = false;
      const input = { numCards: 40, deck_id: 1 };
      const output = { cards: [], success: false };
      const stringify = jest.fn(() => Promise.resolve(output));
      provider.apiCall = jest.fn(() => Promise.resolve({ json: stringify }));
      try {
        await provider.getCards(input);
      } catch (err) {
        message = err.message;
      }
      expect(message).toBeTruthy();
      expect(message).toEqual('No success in fetching cards!');
    });

    it('has success and returns cards', async () => {
      const input = { numCards: 40, deck_id: 1 };
      const output = { cards: [], success: true };
      const stringify = jest.fn(() => Promise.resolve(output));
      provider.apiCall = jest.fn(() => Promise.resolve({ json: stringify }));
      const result = await provider.getCards(input);
      expect(result).toEqual([]);
    });
  });
});
