import _ from 'lodash';
import dictionary from './dictionary';
import dadjoke from './dadjoke';
import config from './config.json';
import commands from './commands.json';
import responses from './responses.json';

export default () => {
    global._ = _;
    global.Dictionary = dictionary;
    global.DadJoke = dadjoke;
    global.config = config;
    global.commands = commands;
    global.responses = responses;
}