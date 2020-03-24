const { RichEmbed } = require('discord.js');
const _ = require('lodash');
const { findRole, findMember } = require('../../../helpers');

const shame_urls = [
    'https://media.giphy.com/media/Ob7p7lDT99cd2/giphy.gif',
    'https://media.giphy.com/media/14saZ73y5Ik5uE/giphy.gif',
    'http://giphygifs.s3.amazonaws.com/media/Db3OfoegpwajK/giphy.gif',
    'https://media.giphy.com/media/eP1fobjusSbu/giphy.gif',
    'https://media.giphy.com/media/uTo9Tm86DC3io/giphy.gif',
    'http://giphygifs.s3.amazonaws.com/media/G9j9CAnE39cpq/giphy.gif'
];

module.exports = async ({ msg, content, data: { members, roles }}, client, user) => {
    const member = findMember(user.username, members);
    const role = findRole(member.roles[0], roles);
    
    if(!_.includes(`Daddy`, role.name)) {
        return msg.channel.send(`You're no daddy. Not moving message.`);
    }

    try {
        const content_arr = content.split(` `);
        const channel = content_arr.pop();
        const message_id = content_arr.pop();
        const message = await msg.channel.fetchMessage(message_id)
    
        if (message.author.username === `coffeebot`) return;

        const correct_channel = client.channels.find("name", channel);
        correct_channel.send(`<@${message.member.user.id}> said this in the wrong channel: \n >>> ${message.content}`);
        
        const random_shame = shame_urls[_.random(shame_urls.length - 1)];
        const shame_image = new RichEmbed()
        .setImage(random_shame);
        correct_channel.send(shame_image);
    
        // Cleanup
        msg.delete(1000);
        message.delete(1000);
        message.author.send(`You posted in the wrong channel! Moved your message to ${channel}. \n >>> ${message.content}`);
        console.log(`Moved message ${message.content} to ${channel}`)
    } catch (err) {
        msg.channel.send(`Couldn't process your dumb request.`);
        console.log(`Issue processing message: ${content}`)
    }
}