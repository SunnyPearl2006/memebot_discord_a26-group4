import { Card, Suit } from './Card.js';

export class Deck {
    #decks; // number of 52-card decks in the total deck
    #cards = [];
    #discarded = [];

    constructor(decks = 1){
        this.#decks = decks;
        // form the deck
        for(let deck=0; deck<decks; ++deck){
            for(const suit of Object.values(Suit)){
                for(let rank=2; rank<=14; ++rank){
                    this.#cards.push(new Card(rank, suit));
                }
            }
        }
    }

    // pop off back of array, return -1 for an empty deck
    draw() { return this.#cards.pop()} 
    get capacity() { return this.#decks * 52; }
    get size() { return this.#cards.length; }

    // fisher yates shuffle
    shuffle(){
        for(let i = this.#cards.length-1; i>0; --i){
            let j = Math.floor(Math.random() * (i+1)); // [0,1)
            [this.#cards[i], this.#cards[j]] = [this.#cards[j], this.#cards[i]]; // swap in place
        }
    }
}