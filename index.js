require('dotenv').config()
const { Client } = require('discord.js-selfbot-v13')
const keep_alive = require('./keep_alive.js')
const client = new Client()

const port = process.env.PORT || 8080;

client.on('ready', async () => {
    console.log(`Logged in as ${client.user.tag}!`)

    const channel = await client.channels.fetch('1317785610785787907') // Channel for /userphone

    async function userphone() {
        await channel.sendSlash('247283454440374274', 'userphone') // Send /userphone command
        console.count('Userphone interaction started!')

        // Wait for 5 seconds before sending the message
        setTimeout(async () => {
            await channel.send('discord.gg/look for submissive egirls') // Send the custom message
            console.log('Message sent in Userphone channel!')

            // Wait for another 5 seconds before sending /hangup
            setTimeout(async () => {
                await channel.sendSlash('247283454440374274', 'hangup') // Send /hangup command
                console.log('Hangup command sent to stop the process.')
            }, 5000) // 5-second delay before sending /hangup
        }, 5000) // 5-second delay before sending the message
    }

    function loop() {
        // Trigger /userphone command every 1-2 minutes, with random intervals
        const min = 60 * 1000 // 1 minute in milliseconds
        const max = 120 * 1000 // 2 minutes in milliseconds
        const randomInterval = Math.floor(Math.random() * (max - min + 1)) + min
        setTimeout(function () {
            userphone()
            loop()
        }, randomInterval)
    }
    
    userphone()
    loop()
})

client.login(process.env.TOKEN)
