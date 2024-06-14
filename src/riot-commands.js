// 20 requests every 1 seconds(s)
// 100 requests every 2 minutes(s)

const { clear } = require("console");

require("dotenv").config();

if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require("node-localstorage").LocalStorage;
  localStorage = new LocalStorage("./cache");
}

async function getSummonerRank(userMessage) {
  console.log("UserMessage from riot-commands: " + userMessage);
  let responseAccount = await fetch(
    `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${userMessage}?api_key=RGAPI-83f7f02f-89a5-4d5e-91d2-8cdaf2c9c606`
  );
  let data = await responseAccount.json();
  let id = encodeURIComponent(data.id);
  console.log("This is the first api: " + id);

  let response = await fetch(
    `https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/${id}?api_key=RGAPI-83f7f02f-89a5-4d5e-91d2-8cdaf2c9c606`
  );
  let newData = await response.json();
  console.log("This is the second api: " + newData);
  localStorage.setItem("newData", JSON.stringify(newData));
}

module.exports = {
  getSummonerRank,
};
