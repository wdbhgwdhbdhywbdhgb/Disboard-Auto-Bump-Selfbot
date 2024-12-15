require('dotenv').config()
const { Client } = require('discord.js-selfbot-v13')
const keep_alive = require('./keep_alive.js')
const client = new Client()

client.on('ready', async () => {
    console.log(`Logged in as ${client.user.tag}!`)

    const channel = await client.channels.fetch('1313615527268061335') // Channel for /userphone

    async function userphone() {
        await channel.sendSlash('247283454440374274', 'userphone') // Send /userphone command
        console.count('Userphone interaction started!')

        // Wait a short moment before sending the message
        setTimeout(async () => {
            await channel.send('discord.gg/look for submissive egirls') // Send the custom message
            console.log('Message sent in Userphone channel!')

            // After sending the message, use /hangup
            setTimeout(async () => {
                await channel.sendSlash('247283454440374274', 'hangup') // Send /hangup command to stop the process
                console.log('Hangup command sent to stop the process.')
            }, 3000) // Adjust delay if needed before sending /hangup
        }, 3000) // Adjust delay if needed
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
