// generates a value for a player hand
// each hand should have a unique value unless its equivalent e.g. to players have ace high

// every hand has a tier (flush, pair, high card)
// each combination for each tier has a logic to resolves who better (high card, runoff high card)
// 2-10 J Q K A e.g. 2-14 highest card wins 
// suits are ignored for rating, they only count toward the goal of creating the tier

// recive the 5 card hand
// find best tier hand contains
// assign the high card(s) value
// return that information 