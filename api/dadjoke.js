const axios = require('axios');

const {
    DAD_JOKE
} = process.env;

const headers = {
    "User-Agent": "Discord Bot (https://github.com/michaelburnley/discord-bot)",
    "Accept": "application/json"
};

module.exports = axios.create({
    baseURL: DAD_JOKE,
    headers
});