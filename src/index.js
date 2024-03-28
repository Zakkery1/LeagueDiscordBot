
require('dotenv').config();
const { getSummonerRank } = require('./riot-commands.js');
const { LocalStorage } = require('node-localstorage');
const{ Client, IntentsBitField } = require('discord.js');
const { json } = require('stream/consumers');
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

    if (message.content.startsWith("!")){
        message.reply('Looking Up Summoner Account....');
        let userMessage = message.content.slice(1);
        console.log(userMessage)
        getSummonerRank(userMessage);
        const localStorage = new LocalStorage('./cache');
        const data = localStorage.getItem('newData.json');
        message.reply(data)
        let x = data.split(",");
        // for(const key in x){
        //     key.removeItem(x[key]);
        //     console.log(`This is data ${key}: ${x[key]}`);
        // }
    }
});

client.login(process.env.TOKEN);