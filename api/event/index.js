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

    client.on('message', msg => {
        // const send = message.channel.send;
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
        }

    })
    
    client.on('guildMemberUpdate', (oldMember, newMember) => {
        
    });
    
    client.login(DISCORD_BOT_TOKEN);
}