// 20 requests every 1 seconds(s)
// 100 requests every 2 minutes(s)

require('dotenv').config();
const { LocalStorage } = require('node-localstorage');

async function getSummonerRank(userMessage) {
    let responseAccount = await fetch(`https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${userMessage}?api_key=RGAPI-a09b5349-6347-45b2-aa88-c555d34818b9`);
    let data = await responseAccount.json();
    let id = data.id;
    
    let response = await fetch(`https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/${id}?api_key=RGAPI-a09b5349-6347-45b2-aa88-c555d34818b9`);
    let newData = await response.json();
    const localStorage = new LocalStorage('./cache');
    localStorage.setItem('newData.json', JSON.stringify(newData));
    const keys = Object.keys(newData[0]);
    for(let key in keys){
        keys.removeItem(key)
    }
    

};

module.exports = {
    getSummonerRank,
};