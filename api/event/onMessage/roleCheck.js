const { findRole, findMember } = require('../../../helpers');
const pluralize = require('pluralize');

module.exports = ({ msg, content, data: { members, roles } }) => {
    console.log(content)
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
};