import dictionary from '../dictionary';

export default async (word) => {
    const definition = await dictionary.get(`/${word}?key=${Dream.dictionary.api_key}`);
    return definition;
}