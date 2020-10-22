import axios from 'axios';

const {
    DICTIONARY_API_URL
} = process.env;

export default axios.create({
    baseURL: DICTIONARY_API_URL,
});