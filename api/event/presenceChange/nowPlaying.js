const {
    PRIMARY_CHANNEL,
} = process.env;

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
    channel.send(`${username} is playing ${newMember.presence.game}. Anyone want to join?`)
};