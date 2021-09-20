module.exports = {
    name: 'leave',
    description: "El bot abandonará el chat de voz",
    async execute(message, args){
        const voiceChannel = message.member.voice.channel;
        if(!voiceChannel) return message.channel.send('Debes estar en el chat de voz donde se esté reproduciendo música');
        await voiceChannel.leave();
        await message.channel.send('Dejando el chat de voz :smiling_face_with_tear: ')
    }
}