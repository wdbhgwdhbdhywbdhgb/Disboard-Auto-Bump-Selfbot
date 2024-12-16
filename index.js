require('dotenv').config();
const { Client } = require('discord.js-selfbot-v13');
const keep_alive = require('./keep_alive.js');

const client = new Client();
let isRunning = true; // Bot operational state

client.on('ready', async () => {
    console.log(`Logged in as ${client.user.tag}!`);
    const channel = await client.channels.fetch('1317785610785787907'); // Channel for /userphone

    async function userphone() {
        if (!isRunning) return; // Exit if bot is paused
        console.log('Attempting to start a call...');

        await channel.sendSlash('247283454440374274', 'userphone'); // Initiate the /userphone command
        console.log('Userphone command sent.');

        // Wait for a confirmation message
        const filter = (msg) => msg.author.id === '247283454440374274' && msg.content.includes("You're now connected to a call");
        const collected = await channel.awaitMessages({ filter, max: 1, time: 120000, errors: ['time'] }).catch(() => null);

        if (collected) {
            // If the call goes through, send your promo message
            console.log('Call connected! Sending promo message...');
            await channel.send('discord.gg/look for submissive egirls');
            
            // Hang up after sending the promo message
            setTimeout(async () => {
                await channel.sendSlash('247283454440374274', 'hangup');
                console.log('Promo message sent and call ended.');
            }, 5000); // Wait 5 seconds before hanging up
        } else {
            // If no confirmation is received, hang up and retry later
            console.log('Call failed to connect. Hanging up and retrying in an hour...');
            await channel.sendSlash('247283454440374274', 'hangup');
            setTimeout(userphone, 3600000); // Retry after 1 hour
        }
    }

    // Main loop to control call retries
    async function loop() {
        if (!isRunning) {
            console.log('Bot is paused. Waiting for activation...');
            return;
        }

        console.log('Starting Userphone interaction...');
        await userphone();

        // Random interval between retries (1-2 minutes)
        const min = 60000;
        const max = 120000;
        const randomInterval = Math.floor(Math.random() * (max - min + 1)) + min;
        setTimeout(loop, randomInterval); // Schedule the next call
    }

    loop(); // Start the loop
});

// Commands to toggle the bot on/off
client.on('messageCreate', async (message) => {
    if (!message.author.bot && message.content.startsWith('!start')) {
        isRunning = true;
        console.log('Bot activated!');
        message.reply('Bot has been started!');
        loop(); // Restart the loop if it's paused
    }

    if (!message.author.bot && message.content.startsWith('!stop')) {
        isRunning = false;
        console.log('Bot paused!');
        message.reply('Bot has been stopped!');
    }
});

client.login(process.env.TOKEN);
