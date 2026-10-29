// how each card is formatted - how to display the card 
// suit, value

const suitSpade = '\u2660';   // ♠
const suitHeart = '\u2665';   // ♥
const suitDiamond = '\u2666'; // ♦
const suitClub = '\u2663';    // ♣

class Card {
    #value;
    #suit;
    constructor(value_, suit_) {   
        value = value_;
        suit = suit_;
    }

    getIcon(suit){
        return 
    }

    toString() { 
        return `${value} ${getIcon(suit)}`; 
    }
}