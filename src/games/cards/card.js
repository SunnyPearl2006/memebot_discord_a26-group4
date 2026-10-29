const Suit = {
  HEARTS:   { name: 'hearts',   symbol: '\u2665', color: 'red'   }, // ♥
  CLUBS:    { name: 'clubs',    symbol: '\u2663', color: 'black' }, // ♣
  DIAMONDS: { name: 'diamonds', symbol: '\u2666', color: 'red'   }, // ♦
  SPADES:   { name: 'spades',   symbol: '\u2660', color: 'black' }, // ♠
};

const RANK_LABELS = { 11: 'J', 12: 'Q', 13: 'K', 14: 'A' };

class Card {
  #rank;
  #suit;

  constructor(rank, suit) {
    // add in bounds checking
    // throw error in case of misuse
    if(rank < 2 || rank > 14 || !Object.values(Suit).includes(suit)){
        throw new Error("invalid parameters for card class"); 
    }
    this.#rank = rank;
    this.#suit = suit;
  }

  get rank() { return this.#rank; }
  get suit() { return this.#suit; }

  get rankLabel() {
    return this.#rank > 10 ? RANK_LABELS[this.#rank] : String(this.#rank);
  }

  toString() {
    return `${this.rankLabel}${this.#suit.symbol}`;
  }
}