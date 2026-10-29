// when /poker is sent in chat respond with questionare and use this 
// file to handle calls about the game of blackjack
// reads args, calls game logic, sends output
// players send messages to the bot -> bot sends those to here -> game logic -> then
// tell the bot what to message back (upated game state)

// /poker sends message from discord to js -> play poker with @user
// this file takes that reply and dispatches to /games for game logic
// start game (need a way to store current game state with specifc user)
// /do-action (interact with game state and reposnd with changes)
// game over (thank the player for playing, close game with player)(e.g. they can play again)