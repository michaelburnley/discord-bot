const config = require('../../config.json');
const Discord = require('discord.js');
const client = new Discord.Client();
const http = require ('http');
const _ = require('lodash');
const { findRole, findMember } = require('../../helpers');
const pluralize = require('pluralize');
const commands = require('./commands.json');

const {
    PORT,
    DISCORD_BOT_TOKEN,
    PRIMARY_CHANNEL,
} = process.env;

const handle = (req, res) => {res.send('hit');};
const server = http.createServer(handle);
server.listen(PORT || 5000);

module.exports = (data) => {
    const {
        guild,
        roles,
        members
    } = data;

    client.once('ready', () => {
        console.log('Ready!');
    })

    client.on('presenceUpdate', (oldMember, newMember) => {
        const {
            game
        } = newMember.presence;
        if(game) {
            const {
                user,
                presences
            } = newMember;
    
            const channel = client.channels.find('name', PRIMARY_CHANNEL);
            let username = newMember.nick;
            const everyone = _.find(roles, (role) => {
                return role.name === 'Daddy';
            });

            if(!username) {
                username = user.username;
            }

            channel.send(`${username} is playing ${newMember.presence.game}. Anyone want to join? <&${everyone.id}>`)
        }
    });
    
    
    client.on('message', msg => {
        // const send = message.channel.send;
        if(_.includes(msg.content, config.prefix)) {
            const content = msg.content.replace(`${config.prefix} `,'');
            if(_.includes(content, commands.roleLookup)) {
                const message = content.split(' ');
                const member = findMember(message[2], members);
                if(!member) {
                    msg.channel.send(`Sorry, couldn't find ${message[2]}`);
                    return;
                }
                const {
                    user,
                } = member;
                const role = findRole(member.roles[0], roles);
                const formatted_role = pluralize(role.name, 1);
                console.log(formatted_role);
    
                if(member.nick) {
                    msg.channel.send(`${member.nick} is a ${formatted_role}`);
                    return;
                }
                msg.channel.send(`${user.username} is a ${formatted_role}`);
            }
        
            if (content === "hi coffeebot" || content === "hey coffeebot" || content === "coffeebot" || content === "whats up coffebot") {
                msg.channel.send(commands.hello)
            }

            if(_.includes(content, commands.demote.command[0])) {
                const {
                    username
                } = msg.member.user;
                const member = findMember(username, members);
                const role = findRole(member.roles[0], roles);
                if(!_.includes(commands.demote.permission, role.name)) {
                    msg.channel.send(`You're no ${commands.demote.permission[0]}`);
                    return;
                }
                msg.channel.send(`Yes, ${role.name} ${username}. Demoting now.`)
            }
        }

    })
    
    client.on('guildMemberUpdate', (oldMember, newMember) => {
        
    });
    
    client.login(DISCORD_BOT_TOKEN);
}