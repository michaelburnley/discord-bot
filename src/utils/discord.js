import axios from 'axios';

const {
    BOT_VERSION,
    URL,
    DISCORD_BOT_TOKEN,
    DISCORD_API_URL,
} = process.env;

const headers = {
    'Authorization': `Bot ${DISCORD_BOT_TOKEN}`,
    'User-Agent': `DiscordBot (${URL} ${BOT_VERSION})`,
};

export default axios.create({
    baseURL: DISCORD_API_URL,
    headers,
});
