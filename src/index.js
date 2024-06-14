require("dotenv").config();
const { getSummonerRank, clearData } = require("./riot-commands.js");
const { LocalStorage } = require("node-localstorage");
const { Client, IntentsBitField } = require("discord.js");
const { json } = require("stream/consumers");
const localStorage = new LocalStorage("./cache");
const { MessageAttachment } = require("discord.js");
const client = new Client({
  // guild is a server
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

//listens for when the bot is ready
client.on("ready", (c) => {
  console.log(`✅ ${c.user.tag} is online.`);
});

// Dileepas message
client.on("messageCreate", (message) => {
  let userMessage = message.content.toLowerCase();
  console.log(message);
  if (message.author.bot) {
    return;
  }

  if (userMessage === "dileepa!") {
    message.reply(
      "Gay! 🏳️‍🌈🏳️‍🌈" +
        "https://tenor.com/view/on-god-no-cap-big-facts-dance-gif-25336254"
    );
  }

  if (userMessage === "butters!") {
    message.reply(
      "Is a Bitch " +
        "https://tenor.com/view/kevin-hart-long-titty-boobs-no-nipple-gif-16607840"
    );
  }

  if (userMessage === "zakk!") {
    message.reply(
      "Is the best!" +
        "https://tenor.com/view/best-zeli-the-best-meme-indian-gif-14494441"
    );
  }
  let gif =
    "https://tenor.com/view/washing-washing-the-food-crazy-weird-strange-gif-15829968";
  if (userMessage === "anthony!") {
    message.reply(
      `is to understand that washing chicken is a cardinal sin. ${gif}`
    );
  }
  // else if (message.content.toLowerCase() === 'max' || message.content.toLowerCase() === 'verstappen'){
  //     message.reply('https://www.youtube.com/watch?v=jG2AciJ3zHY')
  // }
});

client.on("messageCreate", async (message) => {
  try {
    localStorage.removeItem("newData");

    if (message.author.bot) {
      return;
    }

    if (message.content.startsWith("!")) {
      // message.reply('Looking Up Summoner Account....');
      let userMessage = encodeURIComponent(message.content.slice(1));
      console.log(userMessage);
      await getSummonerRank(userMessage);
      let parsedData = JSON.parse(localStorage.getItem("newData"));
      // const attachment = new MessageAttachment('../src/rankBadges/Challenger.png');
      message.reply(`Rank: ${parsedData[0].tier} ${parsedData[0].rank}`);
      // message.channel.send({files: ['../src/rankBadges/Challenger.png']});
      // message.reply(parsedData)
      message.channel.send();
      console.log(parsedData);
    }

    localStorage.removeItem("newData");
  } catch (error) {
    console.error(error);
  }
});

client.login(process.env.TOKEN);
