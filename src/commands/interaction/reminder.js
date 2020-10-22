import { Command } from 'discord.js-commando';
import richEmbed from '../../helpers/sendEmbed';

export default class reminderCommand extends Command{
    constructor(client) {
        super(client, {
            name: 'reminder',
            aliases: ['remindme', ''],
            group: 'basic',
            memberName: 'poll',
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
        // this.client = client;
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

        const rich_text = richEmbed({ 
            title: message_data,
            description: `<@${msg.author.id}> really needs to know: ${text}`,
            color: `#ff0000`,
            thumbnail: 'https://media.giphy.com/media/a5viI92PAF89q/giphy.gif',
            // image: 'https://media.giphy.com/media/a5viI92PAF89q/giphy.gif' 
        });
        msg.say(rich_text)
        .then((message) => {
            message.react("👍")
            message.react("👎")
        });
    } 
}