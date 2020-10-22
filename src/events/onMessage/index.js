import thanks from './thankyou';
import joke from './joke';
import define from './define';

export default (msg) => {
    if (!_.startsWith(msg.content, config.prefix)) return;
    
    const content = _.replace(msg.content, `${config.prefix} `,'');

    const msg_data = {
        msg,
        content,
    };

    if(_.includes(commands.appreciation, content)) thanks(msg_data);
    if(_.includes(commands.joke, content)) joke(msg_data);
    if(_.includes(commands.joke, content)) define(msg_data);
    if(_.includes(commands.roleLookup, content)) roleCheck(msg_data);
    if(_.includes(commands.demote.command[0], content)) demote(msg_data);
    if(_.includes(commands.moveMessage, content)) moveMessage(msg_data, client);

}