import { EmbedBuilder } from 'discord.js';

function createDeck() {
    const suits = ['♠', '♥', '♦', '♣'];
    const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    let deck = [];

    for (let suit of suits) {
        for (let value of values) {
            deck.push({ suit, value });
        }
    }
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
}

function calculateScore(hand) {
    let score = 0;
    let aces = 0;

    for (let card of hand) {
        if (card.value === 'A') {
            aces += 1;
            score += 11;
        } else if (['J', 'Q', 'K'].includes(card.value)) {
            score += 10;
        } else {
            score += parseInt(card.value);
        }
    }

    while (score > 21 && aces > 0) {
        score -= 10;
        aces -= 1;
    }
    return score;
}

function formatHand(hand, hideSecondCard = false) {
    if (hideSecondCard) {
        return `${hand[0].value}${hand[0].suit}, ❓`;
    }
    return hand.map(card => `${card.value}${card.suit}`).join(', ');
}

export default {
    name: 'messageCreate',
    async execute(message) {
        if (message.author.bot) return;
        
        if (message.content.toLowerCase() !== '!blackjack') return;

        const deck = createDeck();
        const playerHand = [deck.pop(), deck.pop()];
        const botHand = [deck.pop(), deck.pop()];

        let playerScore = calculateScore(playerHand);
        let botVisibleScore = calculateScore([botHand[0]]); 

        if (playerScore === 21) {
            return message.reply({ content: `♠️♥️ **BLACKJACK!** You hit 21 immediately! You win! 🎉\nYour Hand: ${formatHand(playerHand)}` });
        }

        const embed = new EmbedBuilder()
            .setTitle('♠️♥️ Blackjack ♣️♦️')
            .setColor('Blurple')
            .setDescription('Type **hit** to draw another card, or **stand** to keep your hand.')
            .addFields(
                { name: `Your Hand (Score: ${playerScore})`, value: formatHand(playerHand), inline: true },
                { name: `Bot's Hand (Score: ${botVisibleScore})`, value: formatHand(botHand, true), inline: true }
            );

        const gameMessage = await message.reply({ embeds: [embed] });

        const filter = (m) => m.author.id === message.author.id && ['hit', 'stand'].includes(m.content.toLowerCase());
        const collector = message.channel.createMessageCollector({ filter, time: 60000 });

        collector.on('collect', async (m) => {
            const choice = m.content.toLowerCase();
            
            m.delete().catch(() => {});

            if (choice === 'hit') {
                playerHand.push(deck.pop());
                playerScore = calculateScore(playerHand);

                if (playerScore > 21) {
                    let botScore = calculateScore(botHand);
                    embed.setColor('Red')
                        .setDescription('💥 **BUST!** You went over 21. The bot wins.')
                        .setFields(
                            { name: `Your Hand (Score: ${playerScore})`, value: formatHand(playerHand), inline: true },
                            { name: `Bot's Hand (Score: ${botScore})`, value: formatHand(botHand), inline: true }
                        );
                    
                    await gameMessage.edit({ embeds: [embed] });
                    collector.stop('finished');
                } else if (playerScore === 21) {
                    let botScore = calculateScore(botHand);
                    
                    while (botScore < 17) {
                        botHand.push(deck.pop());
                        botScore = calculateScore(botHand);
                    }

                    let resultText = '';
                    let color = 'Green';

                    if (botScore === 21) {
                        resultText = '🤝 **Push!** The bot also hit 21. It\'s a tie.';
                        color = 'Yellow';
                    } else {
                        resultText = '🎉 **You Win!** You hit exactly 21!';
                    }

                    embed.setColor(color)
                        .setDescription(resultText)
                        .setFields(
                            { name: `Your Hand (Score: ${playerScore})`, value: formatHand(playerHand), inline: true },
                            { name: `Bot's Hand (Score: ${botScore})`, value: formatHand(botHand), inline: true } 
                        );

                    await gameMessage.edit({ embeds: [embed] });
                    collector.stop('finished');
                } else {
                    embed.setFields(
                        { name: `Your Hand (Score: ${playerScore})`, value: formatHand(playerHand), inline: true },
                        { name: `Bot's Hand (Score: ${botVisibleScore})`, value: formatHand(botHand, true), inline: true }
                    );
                    await gameMessage.edit({ embeds: [embed] });
                }
            } 
            else if (choice === 'stand') {
                let botScore = calculateScore(botHand);
                
                while (botScore < 17) {
                    botHand.push(deck.pop());
                    botScore = calculateScore(botHand);
                }

                let resultText = '';
                let color = 'Red';

                if (botScore > 21) {
                    resultText = '🎉 **BOT BUSTED!** You win!';
                    color = 'Green';
                } else if (botScore > playerScore) {
                    resultText = '😔 **Bot Wins!** Better luck next time.';
                } else if (botScore < playerScore) {
                    resultText = '🎉 **You Win!** Congratulations!';
                    color = 'Green';
                } else {
                    resultText = '🤝 **Push!** It\'s a tie.';
                    color = 'Yellow';
                }

                embed.setColor(color)
                    .setDescription(resultText)
                    .setFields(
                        { name: `Your Hand (Score: ${playerScore})`, value: formatHand(playerHand), inline: true },
                        { name: `Bot's Hand (Score: ${botScore})`, value: formatHand(botHand), inline: true } 
                    );

                await gameMessage.edit({ embeds: [embed] });
                collector.stop('finished');
            }
        });

        collector.on('end', async (collected, reason) => {
            if (reason === 'time') {
                embed.setColor('Red').setDescription('⏰ **Time is up!** The game was cancelled.');
                await gameMessage.edit({ embeds: [embed] }).catch(() => {});
            }
        });
    },
};