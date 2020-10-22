import _ from 'lodash';
import discord from './discord';
import dictionary from './dictionary';
import dadjoke from './dadjoke';
import config from './config.json';

export default () => {
    global._ = _;
    global.Discord = discord;
    global.Dictionary = dictionary;
    global.DadJoke = dadjoke;
    global.config = config;
}