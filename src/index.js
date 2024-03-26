
require('dotenv').config();
const { getSummonerRank } = require('./riot-commands.js');
const { LocalStorage } = require('node-localstorage');
const{ Client, IntentsBitField } = require('discord.js');
const client = new Client({

    // guild is a server 
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
})

//listens for when the bot is ready
client.on('ready', (c) => {
    console.log(`✅ ${c.user.tag} is online.`)
})


// Dileepas message
// client.on('messageCreate', (message) => {
//     if(message.author.bot){
//         return;
//     }

//     if (message.content === 'Dileepa'.toLowerCase()){
//         message.reply('')
//     }
// });

client.on('messageCreate', (message) => {
    if(message.author.bot){
        return;
    }
    if (message.content == "!Summon".toLowerCase()){
        message.reply('Looking Up Summoner Account....');
        getSummonerRank();
        let userMessage = message.content;
        // const data = LocalStorage.getItem('newData');
        // message.reply(data)
        // let x = getSummonerRank();
        // console.log(x);
    }
});


client.login(process.env.TOKEN); 
