const commands = require('../commands.json');
const _ = require('lodash');
const { updateRole } = require('../../sendData');
const { findRole, findMember } = require('../../../helpers');

module.exports = ({ msg, content, data: { roles, members, guild }}) => {
    const query = content.split(' ');
    const {
        username
    } = msg.member.user;
    const member = findMember(username, members);
    const role = findRole(member.roles[0], roles);
    if(!_.includes(commands.demote.permission, role.name)) {
        msg.channel.send(`You're no ${commands.demote.permission[0]}`);
        return;
    }
    const demoted_member = _.find(members, (mem) => {
        return mem.user.username.toLowerCase() === query[1].toLowerCase();
    });
    if(!demoted_member) {
        msg.channel.send(`Couldn't find user: ${query[1]}`);
        return;
    }

    const demoted_member_role = findRole(demoted_member.roles.slice(-1)[0] , roles);

    let new_role = _.find(roles, (r) => {
        return r.name.toLowerCase() === query[3].toLowerCase();
    });

    if(!new_role) {
        msg.channel.send(`Couldn't find role: ${query[3]}`);
        return;
    }

    msg.channel.send(`Yes, ${role.name} <@${msg.member.user.id}>. Changing <@${demoted_member.user.id}> now.`);
    
    let obj = {
        new_role: new_role.id,
        old_role: demoted_member_role.id,
        user_id: demoted_member.user.id,
        guild_id: guild.id,
    }
    console.log(obj)
    updateRole(obj);
}