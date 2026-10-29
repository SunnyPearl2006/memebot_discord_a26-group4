const event = {
  name: "messageCreate",
  async execute(message, client) {
    if (message.author.bot) return; // prevent infinite loop 
    if (message.content.at(0) !== "!") return; // not a command 

    switch (message.content.trim()) {
      case "!testwelcome":
        client.emit("guildMemberAdd", message.member);
        break;
      case "!someCommandString":
        // do something
        break;
      default:
        message.reply("Not a reconized command");
    }
  },
};

export default event;
