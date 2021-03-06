const { Command } = require('discord.js-commando');
const _ = require('lodash');
const dictionary = require('../../../lookup/index');
const richEmbed = require('../../../../helpers/sendEmbed');

module.exports = class defineCommand extends Command{
    constructor(client) {
        super(client, {
            name: 'define',
            aliases: ['def'],
            group: 'basic',
            memberName: 'define',
            description: 'Look up a word',
            examples: ['!define pizza'],
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

        if(!definitions) {
            msg.say(`Couldn't find ${text}. Did you misspell your word?`);
            return;
        }

        let formatted = [];
        let count = 1;
        _.each(definitions.shortdef, (definition) => {
            let format = `${count}. ${definition}\n`;
            formatted.push(format);
            count++;
        });

        const rich_text = richEmbed({ 
            title: `${text} (${definitions.fl})`,
            description: formatted,
            color: `#0000ff`
        })
        msg.say(rich_text)
    }
}