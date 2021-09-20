const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');

module.exports = {
    name: 'play',
    description: "Comando para poner musica",
    async execute(message, args){
        const voiceChannel = message.member.voice.channel;

        if(!voiceChannel) return message.channel.send('Debes estar en un canal de voz.');

        const permissions = voiceChannel.permissionsFor(message.client.user);

        if(!permissions.has('CONNECT')) return message.channel.send('No hay permisos suficientes');
        if(!permissions.has('SPEAK')) return message.channel.send('No hay permisos suficientes');

        if(!args.length) return message.channel.send("Debes mandar el link de la canción, o una palabra clave para buscarla");

        const validURL = (str) =>{
            var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
            if(!regex.test(str)){
                return false;
            } else {
                return true;
            }
        }
 
        if(validURL(args[0])){
 
            const  connection = await voiceChannel.join();
            const stream  = ytdl(args[0], {filter: 'audioonly'});
 
            connection.play(stream, {seek: 0, volume: 1})
            .on('finish', () =>{
                voiceChannel.leave();
                message.channel.send('leaving channel');
            });
 
            await message.reply(`:thumbsup: Reproduciendo tu canción`)
 
            return
        }

        const connection = await voiceChannel.join(); 

        const videoFinder = async (query) => {
            const videoResult = await ytSearch(query);

            return (videoResult.videos.length > 1) ? videoResult.videos[0] : null;
        }

        const video = await videoFinder(args.join(' '));

        if(video){
            const stream = ytdl(video.url, {filter: 'audioonly'});

            connection.play(stream, {seek: 0, volume: 1})
            .on('finish', () => {
                voiceChannel.leave();
            });

            await message.reply(':thumbsup: Reproduciendo: ***' + video.title + '***')

        } else {
            message.channel.send('No encontré el video :( ')
        }
    }
}