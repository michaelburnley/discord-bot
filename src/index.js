import utils from "./utils";
import getData from './helpers/getData';
import events from './services/discord/event';
import commands from './services/discord/commando';

export default () => {
    utils();
    getData() .then((data) => {
        events(data);
        commands();
    });
    
	console.log(`Coffeebot Online!`);
};