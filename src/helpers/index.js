const _ = require('lodash');

module.exports = {
    error: (err) => {
        console.log(err.message);
    },
    findRole: (id, roles) => {
        return _.find(roles, (role) => {
            return role.id === id;
        });
    },
    findMember: (username, members) => {
        let found = _.find(members, (member) => {
            return member.user.username.toLowerCase() === username;
        });

        if(!found) {
            found = _.find(members, (member) => {
                if(member.nick) {
                    return member.nick.toLowerCase() === username;
                }
            });
        }
        return found;
    },
    findMembers: () => {

    },
}