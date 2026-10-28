const event = {
  name: "messageCreate",
  async execute(message, client) {
    if (message.author.bot) return; // prevent infinite loop 
    if (message.content.at(0) !== "!") return; // not a command 

    const CHANNEL_NAME = process.env.CHANNEL_NAME;
    // sends messages in general, looks at all chat messages on the server
    const channel = message.member.guild.channels.cache.find(
      (channel) => channel.name === CHANNEL_NAME
    );

    switch (message.content.trim()) {
      case "!testwelcome":
        client.emit("guildMemberAdd", message.member);
        break;
      case "!someCommandString":
        // do something
        break;
      default:
        channel.send("Not a reconized command");
    }
  },
};

export default event;