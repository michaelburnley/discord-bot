const thanks = require('./thanks');

module.exports = ({ msg }) => {
    const random_choice = thanks[Math.floor(Math.random() * thanks.length)];
    msg.channel.send(random_choice);
};