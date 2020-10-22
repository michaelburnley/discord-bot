const { Command } = require('discord.js-commando');

module.exports = class helloCommand extends Command{
    constructor(client) {
        super(client, {
            name: 'hello',
            aliases: ['hi'],
            group: 'basic',
            memberName: 'hello',
            description: 'Say hello!',
            examples: ['!hello']
        })
    }
    run(msg, { input }) {
        console.log(input);
    msg.say('Hello!')
    }
}