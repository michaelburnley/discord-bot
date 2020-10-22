export default ({ msg }) => {
    const random_choice = responses.thanks[Math.floor(Math.random() * responses.thanks.length)];
    msg.channel.send(random_choice);
};