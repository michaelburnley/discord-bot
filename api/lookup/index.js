const dictionary = require('../dictionary');
const { error } = require('../../helpers');

const {
    DICTIONARY_API_KEY
} = process.env;

module.exports = (word) => {
    return new Promise((resolve) => {
        dictionary.get(`/${word}?key=${DICTIONARY_API_KEY}`)
        .then(({ data }) => {
            return resolve(data[0].shortdef);
        })
        .catch(error)
    });
}