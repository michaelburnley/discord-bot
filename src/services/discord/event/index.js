const config = require('../../config.json');
const Discord = require('discord.js');
const client = new Discord.Client();
const http = require ('http');
const _ = require('lodash');
const commands = require('./commands.json');
const roleCheck = require('./onMessage/roleCheck');
const demote = require('./onMessage/demote');
const nowPlaying = require('./presenceChange/nowPlaying');
const molest = require('./onMessage/molest');
const thanks = require('./onMessage/thankyou');
const moveMessage = require('./onMessage/moveMessage');
const reminder = require('./onMessage/reminder');

const {
    PORT,
    DISCORD_BOT_TOKEN,
} = process.env;

const handle = (req, res) => {res.send('hit');};
const server = http.createServer(handle);
server.listen(PORT || 5000);

module.exports = (data) => {

    client.once('ready', () => {
        console.log('Ready!');
    })

    client.on('presenceUpdate', (oldMember, newMember) => {
        const {
            game,
            status
        } = newMember.presence;
        
        if(game && status === "online") {
            nowPlaying(client, newMember);
        }
    });
    
    //TODO: Coffee sex me - I put on my robe and wizard
    //TODO: coffee touch @user
    //TODO: reminders
    //TODO: send later
    //TODO: call jose llama boy anytime he talks to it
    //TODO: Daddy points  

    client.on('message', msg => {
        if(_.includes(msg.content, config.prefix)) {
            const content = msg.content.replace(`${config.prefix} `,'');
            const msg_data = {
                msg,
                content,
                data
            };

            if(_.includes(content, commands.appreciation)) {
                thanks(msg_data);
            }

            if(_.includes(content, commands.touch) || _.includes(content, commands.smacking)) {
                molest(msg_data);
            }

            if(_.includes(content, commands.roleLookup)) {
                roleCheck(msg_data);
            }

            if(_.includes(content, commands.demote.command[0])) {
                demote(msg_data);
            }

            if(_.includes(content, commands.moveMessage)) {
                moveMessage(msg_data, client);
            }

            // if(_.includes(content, commands.reminders)) {
            //     reminder(msg_data, client);
            // }
        }

    })

    client.on('raw', packet => {
        // We don't want this to run on unrelated packets
        if (!['MESSAGE_REACTION_ADD', 'MESSAGE_REACTION_REMOVE'].includes(packet.t)) return;
        // Grab the channel to check the message from
        const channel = client.channels.get(packet.d.channel_id);
        // There's no need to emit if the message is cached, because the event will fire anyway for that
        if (channel.messages.has(packet.d.message_id)) return;
        // Since we have confirmed the message is not cached, let's fetch it
        channel.fetchMessage(packet.d.message_id).then(message => {
            // Emojis can have identifiers of name:id format, so we have to account for that case as well
            const emoji = packet.d.emoji.id ? `${packet.d.emoji.name}:${packet.d.emoji.id}` : packet.d.emoji.name;
            // This gives us the reaction we need to emit the event properly, in top of the message object
            const reaction = message.reactions.get(emoji);
            // Adds the currently reacting user to the reaction's users collection.
            if (reaction) reaction.users.set(packet.d.user_id, client.users.get(packet.d.user_id));
            // Check which type of event it is before emitting
            if (packet.t === 'MESSAGE_REACTION_ADD') {
                client.emit('messageReactionAdd', reaction, client.users.get(packet.d.user_id));
            }
            if (packet.t === 'MESSAGE_REACTION_REMOVE') {
                client.emit('messageReactionRemove', reaction, client.users.get(packet.d.user_id));
            }
        });
    });

    client.on('messageReactionAdd', (reaction, user) => {

        if (reaction.emoji == '🚚') {
            const msg = reaction.message;
            const content = `move ${msg.id} general`
            const msg_data = {
                msg,
                content,
                data
            };
            moveMessage(msg_data, client, user);
        }
    });
    
    client.on('guildMemberUpdate', (oldMember, newMember) => {
        
    });
    
    client.login(DISCORD_BOT_TOKEN);
}