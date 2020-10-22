import sendEmbed from '../../helpers/sendEmbed';

export default async ({ msg, content }) => {
    const definitions = await Dictionary(content);

    if(!definitions) {
        msg.channel.send(`Couldn't find ${content}. Did you misspell your word?`);
        return;
    }

    let formatted = [];
    let count = 1;
    _.each(definitions.shortdef, (definition) => {
        let format = `${count}. ${definition}\n`;
        formatted.push(format);
        count++;
    });

    const rich_text = sendEmbed({ 
        title: `${text} (${definitions.fl})`,
        description: formatted,
        color: `#0000ff`
    })
    
    msg.channel.send(rich_text);
}