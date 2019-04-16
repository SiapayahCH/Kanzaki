const Discord = require("discord.js"); 
const botconfig = require("../../config.json");
const eco = require('quick.db');
var milkitas = new eco.table('kiracoins')
var ms = require('parse-ms');

module.exports.run = async (client, message, args) => {
  
  let cooldown = 8.64e+7,
    amount = 10000
  
  let lastdaily = await eco.fetch(`lastDaily_${message.author.id}`)
  if (lastdaily !== null && cooldown - (Date.now() - lastdaily) > 0) {
        let timeObj = ms(cooldown - (Date.now() - lastdaily))
        message.channel.send(`:alarm_clock: **${message.author.username}**, **You'll be able claim daily again in ${timeObj.hours} hours, ${timeObj.minutes} minutes and ${timeObj.seconds} seconds**`)
    
  } else {
    
    try {
      let user = message.author;
      
      eco.set(`lastDaily_${message.author.id}`, Date.now());        
      eco.add(`coins_${user.id}`, 100)
        message.channel.send(`**${message.author}, you has claimed your 100 daily**`);
    } catch (e) {
      message.channel.send(e.message);
    } 
  } 
}

exports.conf = {
    aliases: ['dailys', 'dailies', 'dailie'],
    cooldown: 0
}

exports.help = {
  name: "daily",
  description: "Collect your daily every day!",
  usage: "daily"
}