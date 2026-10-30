import { Deck } from '../games/cards/Deck.js';

const event = {
  name: "messageCreate",
  async execute(message, client) {
    if (message.author.bot) return; // prevent infinite loop 
    if (message.content.at(0) !== "!") return; // not a command 

    switch (message.content.trim()) {
      case "!testwelcome":
        client.emit("guildMemberAdd", message.member);
        break;
      case "!testdraw":{
        const newDeck = new Deck();
        newDeck.shuffle();
        const card = newDeck.draw();
        message.reply(`Creates a deck, shuffles it, print top card: ${card}`);
        break;
        // old build code from package.json 
        //"build": "rm -rf build && esbuild src/*.js src/**/*.js --platform=node --format=cjs  --outdir=build --outbase=src",
      }
      default:
        message.reply("Not a reconized command");
    }
  },
};

export default event;
