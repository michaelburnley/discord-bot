const { Command } = require('discord.js-commando');
const _ = require('lodash');
const moment = require('moment');
const schedule = require('node-schedule');
const richEmbed = require('../../../../helpers/sendEmbed');

const cache = {};

module.exports = class pollCommand extends Command{
    constructor(client) {
        super(client, {
            name: 'poll2',
            aliases: ['survey2'],
            group: 'basic',
            memberName: 'poll2',
            description: 'Poll the server for a yes/no question.',
            examples: ['!poll'],
            args: [
                {
                    key: 'text',
                    prompt: 'What do you want to ask?',
                    type: 'string',
                    default: ' ',                    
                }
            ]
        })
    }
    async run(msg, { text }) {

        let message_data = text;

        const regex = /<@![0-9]*>/g;
        const guild = this.client.guilds.get('314265759331254272');

        const matches = [];
        let found;
        while (found = regex.exec(text)) {
            matches.push(found[0]);
            regex.lastIndex = found.index + 1;
        }

        if (matches && matches.length > 0) {

            for (const user_match of matches) {
                const id = _.replace(_.replace(user_match, `<@!`, ``), `>`, ``);
                const member = guild.members.get(id);
                message_data = _.replace(message_data, user_match, member.user.username);
            }
        }

        const date = moment().add({ minutes: 1 }).toDate();
        const rich_text = richEmbed({ 
            title: message_data,
            description: `<@${msg.author.id}> really needs to know: ${text}`,
            color: `#ff0000`,
            thumbnail: 'https://media.giphy.com/media/a5viI92PAF89q/giphy.gif',
            footer: `Poll will end at ${moment(date).format(`hh:mm`)}`
        });
        msg.say(rich_text)
        .then((message) => {
            message.react("👎")
            message.react("👍")
            cache[message.id] = message_data;
            schedule.scheduleJob(date, () => {
                const updated_message = message.channel.fetchMessage(message.id);
                const rich_edit = richEmbed({
                    title: `Poll \"${message_data}\" Closed!`,
                    description: `The result is ${message.reactions}`,
                    footer: ``,
                    color: `#00FF00`,
                });
                // message.edit();
            });
        });
    } 
}