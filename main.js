const { Client, Intents, Message, DiscordAPIError } = require('discord.js');

const Discord = require ('discord.js');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

const prefix = '!';

const fs = require('fs');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles)
{
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log('DachiBot ready to go!');
});

client.on('message', message => {
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);

    const command = args.shift().toLowerCase();

    if(command === 'jack'){
        client.commands.get('jack').execute(message, args);
    }

    if(command === 'ray'){
        client.commands.get('ray').execute(message, args);
    }

    if(command === 'mike'){
        client.commands.get('mike').execute(message, args);
    }

    if(command === 'play'){
        client.commands.get('play').execute(message, args);
    }

    if(command === 'leave'){
        client.commands.get('leave').execute(message, args);
    }

});

client.login("ODg3OTQ5NjYwMTI2MzI2ODQ0.YULlkA.bp80PwZ09e55hcCIQtHFoPMYHt8");