require('dotenv').config();

const _ = require('lodash');
const getData = require('./api/getData');
const events = require('./api/event');
const commands = require('./api/commando');

//TODO: Add Daddy Commands - Admin functionality
//TODO: Mention role when they login or join server
//TODO: Automatically assign roles when people join

getData()
.then((data) => {
    events(data);
    commands();
});