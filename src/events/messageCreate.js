import { userMention } from "discord.js";
import { loadDB } from "../helpers/manDataBase";

// type !testwelcome to test bot functionality
// type !checkusers to check that users are being saved to the database
const event = {
  // checks every message made in discord server general chat(general is specfied in .env file)
  name: "messageCreate",
  async execute(message, client) {
    if (message.author.bot) return; // prevent infinite loop
    const content = message.content.trim();
    if (content === "!testwelcome") client.emit("guildMemberAdd", message.member);
    if (content === "!checkusers") await message.reply(await getUsersReport(message.author.id));
  },
};

const getUsersReport = async (authorId) => {
  const database = await loadDB();
  const users = database.users.filter((u) => u.user_id); // skip empty entries
  const you = users.find((u) => u.user_id === authorId);

  // only list the first 20 so the reply stays under discord's 2000 char limit
  const userList = users
    .slice(0, 20)
    .map((u) => `• ${userMention(u.user_id)} - coins: ${u.coins}, `)
    .join("\n");

  return {
    content: `**Users in database:** ${users.length}
${userList || "(none)"}${users.length > 20 ? `\n...and ${users.length - 20} more` : ""}

**You:** ${you ? `registered \`${JSON.stringify(you)}\`` : "not registered"}`,
    allowedMentions: { parse: [] }, // don't ping everyone in the list
  };
};

export default event;
