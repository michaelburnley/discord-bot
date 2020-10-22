import nowPlaying from './nowPlaying';

export default (oldMember, newMember) => {
    const {
        game,
        status
    } = newMember.presence;
    
    if(game && status === "online") {
        nowPlaying(client, newMember);
    }
}