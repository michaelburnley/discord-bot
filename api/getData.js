// const _ = require('lodash');
const discord = require('./discord');
const error = require('../helpers');
const _ = require('lodash');

const {
    SERVER_NAME,
} = process.env;

const getGuild = () => {
    return new Promise((resolve) => {
        discord.get('/users/@me/guilds')
        .then(({ data }) => {
            const correct_guild = _.find(data, (guild) => {
                return guild.name === SERVER_NAME;
            });
            return resolve(correct_guild);
        })
        .catch(error);
    });
};

const getRoles = (id) => {
    return new Promise((resolve) => {
        discord.get(`/guilds/${id}/roles`)
        .then(({ data }) => {
            return resolve(data);
        })
        .catch(error);
    });
};

const getMembers = (id) => {
    return new Promise((resolve) => {
        discord.get(`/guilds/${id}/members?limit=1000`)
        .then(({ data }) => {
            return resolve(data);
        })
        .catch(error);
    });
};

module.exports = async () => {
    const guild = await getGuild();
    const roles = await getRoles(guild.id);
    const members = await getMembers(guild.id);

    const obj = {
        guild,
        roles,
        members,
    };

    return obj;
};