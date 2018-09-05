class ApiProvider {
  constructor() {
    this.deckUrl = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1';
  }

  apiCall({ url }) {
    return window.fetch(url);
  }

  async getDeck() {
    try {
      const response = await this.apiCall({ url: this.deckUrl });
      const deck = await response.json();

      if (deck.success !== true) {
        throw new Error('No success in fetching deck!');
      }

      this.cardUrl = `https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=1`;
      return deck.deck_id;
    } catch (error) {
      // Todo: dispatch error
      console.warn('Error fetching deck: ', error);
    }
  }

  async getCard() {
    try {
      const response = await this.apiCall({ url: this.cardUrl });
      const card = await response.json();
      console.warn('resp: ', card);

      return card;
    } catch (error) {
      // Todo: dispatch error
      console.warn('Error fetching cards: ', error);
    }
  }

  async getCards({ numCards, deckId }) {
    const url = `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=${numCards}`;

    try {
      const response = await this.apiCall({ url });
      const cards = await response.json();

      if (cards.success !== true) {
        throw new Error('No success in fetching cards!');
      }

      return cards.cards;
    } catch (error) {
      // Todo: dispatch error
      console.warn('Error fetching cards: ', error);
    }
  }
}

const apiProvider = new ApiProvider();

export default apiProvider;
