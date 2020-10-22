import axios from 'axios';

const {
    DAD_JOKE
} = process.env;

const headers = {
    "User-Agent": "Discord Bot (https://github.com/michaelburnley/discord-bot)",
    "Accept": "application/json"
};

export default axios.create({
    baseURL: DAD_JOKE,
    headers
});