const Discord = require('discord.js')
const DOTENV = require('dotenv').config();
const client = new Discord.Client();

client.on('message', msg => {
    if (msg.content === "hi coffeebot") {
        msg.reply('Hey! I\'m a bot.')
    }
})

client.login(process.env.DISCORD_BOT_TOKEN);