
require('dotenv').config();
const { getSummonerRank, clearData } = require('./riot-commands.js');
const { LocalStorage } = require('node-localstorage');
const{ Client, IntentsBitField } = require('discord.js');
const { json } = require('stream/consumers');
const localStorage = new LocalStorage('./cache');
const { MessageAttachment } = require('discord.js')
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
client.on('messageCreate', (message) => {
    // let userMessage = message.toLowerCase();
    console.log(message)
    if(message.author.bot){
        return;
    }

    if (message.content.toLowerCase() === 'dileepa'){
        message.reply('Is Gay! 🏳️‍🌈🏳️‍🌈')
    }
});

client.on('messageCreate', async (message) => {
    try{
        localStorage.removeItem("newData");

        if(message.author.bot){
            return;
        }

        if (message.content.startsWith("!")){
            // message.reply('Looking Up Summoner Account....');
            let userMessage = encodeURIComponent(message.content.slice(1));
            console.log(userMessage);
            await getSummonerRank(userMessage);
            let parsedData = JSON.parse(localStorage.getItem('newData'));
            // const attachment = new MessageAttachment('../src/rankBadges/Challenger.png'); 
            message.reply(`Rank: ${parsedData[0].tier} ${parsedData[0].rank}`);
            // message.channel.send({files: ['../src/rankBadges/Challenger.png']});
            // message.reply(parsedData)
            message.channel.send();
            console.log(parsedData)

        }

        localStorage.removeItem("newData");
    }
    catch(error){
        console.error(error);
    }
});


client.login(process.env.TOKEN);