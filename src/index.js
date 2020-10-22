import utils from "./utils";
import commando from './services/commando';
import discord from './services/discord';

export default () => {
    utils();
    discord();
    // commando();
    
	console.log(`Coffeebot Online!`);
};