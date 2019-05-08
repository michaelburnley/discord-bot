const axios = require('axios');

const {
    DICTIONARY_API_URL
} = process.env;

module.exports = axios.create({
    baseURL: DICTIONARY_API_URL,
});