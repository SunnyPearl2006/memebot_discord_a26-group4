import {EmbedBuilder} from "discord.js";
const event = {
    name:"interactionCreate",
async execute(interaction) {
    if(!interaction.isChatInputCommand()) return;
    if(interaction.commandName !== "badger-den") return;
    const embed = new EmbedBuilder()
    .setTitle("Badger Den")
    .setDescription(
        "Welcome to the Badger Den\n\n" +
        "Blackjack\n"+
        "Coming soon\n\n"+
        "Poker\n"+
        "Coming soon"
    )
    .setFooter({
        text:"More games coming soon"
    });

 await interaction.reply({ embeds:[embed]});

}
};
export default event;