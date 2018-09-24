class ApiProvider {
  constructor() {
    this.deckUrl = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1';
  }

  apiCall({ url }) {
    return window.fetch(url);
  }

  async getDeck() {
    const response = await this.apiCall({ url: this.deckUrl });
    const deck = await response.json();

    if (deck.success !== true) {
      throw new Error('No success in fetching deck!');
    }

    return deck.deck_id;
  }

  async getCards({ numCards, deckId }) {
    const url = `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=${numCards}`;

    const response = await this.apiCall({ url });
    const cards = await response.json();

    if (cards.success !== true) {
      throw new Error('No success in fetching cards!');
    }

    return cards.cards;
  }
}

const apiProvider = new ApiProvider();

export default apiProvider;
