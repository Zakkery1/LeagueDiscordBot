// 20 requests every 1 seconds(s)
// 100 requests every 2 minutes(s)

require('dotenv').config();
const { LocalStorage } = require('node-localstorage');


async function getSummonerRank() {
    let responseAccount = await fetch("https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/WYDStepBro%204k?api_key=RGAPI-360b633b-04b5-4729-bfb3-bd9eafcba193");
    let data = await responseAccount.json();
    let id = data.id;
    // const localStorage = new LocalStorage('./cache');
    // localStorage.setItem('id', id);
    let response = await fetch(`https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/${id}?api_key=RGAPI-360b633b-04b5-4729-bfb3-bd9eafcba193`);
    let newData = await response.json();
    const localStorage = new LocalStorage('./cache');
    localStorage.setItem('newData', newData);
    console.log(newData);
    let rank = [newData[0].tier, newData[0].rank]
    // console.log(rank)
    // console.log(localStorage)

};

module.exports = {
    getSummonerRank,
};