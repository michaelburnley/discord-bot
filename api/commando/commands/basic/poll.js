const { Command } = require('discord.js-commando');
const _ = require('lodash');

module.exports = class pollCommand extends Command{
    constructor(client) {
        super(client, {
            name: 'poll',
            aliases: ['takepoll, question'],
            group: 'basic',
            memberName: 'poll',
            description: 'Look up a word',
            examples: ['!poll is the earth round?'],
            args: [
                {
                    key: 'text',
                    prompt: 'What would you like to look up?',
                    type: 'string',                    
                }
            ]
        })
    }
    async run(msg, { text }) {
        const definitions = await dictionary(text);
        let formatted = [];
        let count = 1;
        _.each(definitions, (definition) => {
            let format = `${count}. \`${definition}\`\n`;
            formatted.push(format);
            count++;
        });
        msg.say(formatted)
    }
}