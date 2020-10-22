const discord = require('./discord');
const { error } = require('../helpers');

module.exports = {
    updateRole: ({
        old_role,
        new_role,
        user_id,
        guild_id
    }) => {
        discord.put(`/guilds/${guild_id}/members/${user_id}/roles/${new_role}`)
        .then(() => {
            console.log(`Added role ${new_role}`);
            discord.delete(`/guilds/${guild_id}/members/${user_id}/roles/${old_role}`)
            .then(() => {
                console.log(`Removed role ${new_role}`);
            });
        })
        .catch(error);
    },
};