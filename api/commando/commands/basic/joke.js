const { Command } = require('discord.js-commando');
const _ = require('lodash');
const richEmbed = require('../../../../helpers/sendEmbed');
const joke = require('../../../dadjoke');

module.exports = class jokeCommand extends Command{
    constructor(client) {
        super(client, {
            name: 'joke',
            aliases: ['dadjoke'],
            group: 'basic',
            memberName: 'joke',
            description: 'Tell a dad joke.',
            examples: ['!joke'],
            args: [
                {
                    key: 'text',
                    prompt: 'What kind of joke?',
                    type: 'string',
                    default: ' ',                    
                }
            ]
        })
    }
    async run(msg, { text }) {
        joke.get(`/search?search_term=${text}`)
        .then(({ data: { results }}) => {
            const random_choice = results[Math.floor(Math.random() * results.length)];
            const message = richEmbed({ title: random_choice.joke})
            msg.say(message);
        })
        .catch((err) => {
            console.log(err.message);
        });
    } 
}