export default (reaction, user) => {

    if (reaction.emoji == '🚚') {
        const msg = reaction.message;
        const content = `move ${msg.id} general`
        const msg_data = {
            msg,
            content,
            data
        };
        moveMessage(msg_data, client, user);
    }
}