const Commando = require('discord.js-commando');
const path = require('path');
const client = new Commando.Client({
    owner: '193891972623106048'
});

const {
    DISCORD_BOT_TOKEN
} = process.env;

module.exports = () => {
    client.on('ready', () => {
        console.log('Commando Ready.')
    })
    client.registry
        // Registers your custom command groups
        .registerGroups([
            ['basic', 'Fun commands'],
            // ['some', 'Some group'],
            // ['other', 'Some other group']
        ])
        // Registers all built-in groups, commands, and argument types
        .registerDefaults()
        // Registers all of your commands in the ./commands/ directory
        .registerCommandsIn(path.join(__dirname, 'commands'));
    
    client.login(DISCORD_BOT_TOKEN);
}