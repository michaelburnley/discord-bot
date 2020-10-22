const gameData = require('./gameData.json');
const sendEmbed = require('../../../../helpers/sendEmbed');

const {
    PRIMARY_CHANNEL,
} = process.env;

const cache = {};

module.exports = (client, newMember) => {
    const {
        user,
        presences
    } = newMember;

    const channel = client.channels.find('name', PRIMARY_CHANNEL);
    let username = newMember.nick;

    if(!username) {
        username = user.username;
    }

    const game = gameData[newMember.presence.game];
    if (!game) return;

    const title = `${username} is playing ${newMember.presence.game}. Anyone want to join?`;
    const rich_message = sendEmbed({ title, ...game })

    const existing_message = cache[username];

    if (existing_message) {
        channel.fetchMessage(cache[username]).then(msg => msg.delete())
    }
    
   channel.send(rich_message).then(msg => {
        cache[username] = msg.id;
    });
    
};