import sendEmbed from '../../helpers/sendEmbed';

export default async ({ msg, content }) => {
    const response = await DadJoke.get(`/search?search_term=${content}`);
    const { data: { results: jokes } } = response;
    const random_choice = jokes[Math.floor(Math.random() * jokes.length)];
    const message = sendEmbed({ title: random_choice.joke });
    msg.channel.send(message);
}