const Discord = require('discord.js')
const DOTENV = require('dotenv').config();
const http = require ('http');
const client = new Discord.Client();
const handle = (req, res) => {res.send("hit")}
const server = http.createServer(handle);

server.listen(process.env.PORT || 5000);

client.on('message', msg => {
    if(msg.author === "killerjose11" || msg.author === "plasmonster") {
        msg.reply("Look, y'all need to stop.")
    }
    else if (msg.content === "hi coffeebot" || msg.content === "hey coffeebot" || msg.content === "coffeebot" || msg.content === "whats up coffebot") {
        msg.reply('Hey! I\'m a bot.')
    }
})

client.login(process.env.DISCORD_BOT_TOKEN);