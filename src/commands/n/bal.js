const Discord = require('discord.js');
const botconfig = require("../../config.json");
const eco = require('quick.db')
var kc = new eco.table('kiracoins')


module.exports.run = async (client, message, args) => {
  
  let kcs = eco.get(`coins_${message.author.id}`)
  //if(!milkita) milkita = 0
  
  if(message.author.bot) return;
  
  message.channel.send(message.author+', you have balance of **'+kcs+'**')
  
}

exports.conf = {
    aliases: ['credit', 'rancoins', 'Rancoins', "rancoin", "Rancoin"],
    cooldown: 1
}

exports.help = {
  name: "credits",
  description: "Showing your credits",
  usage: "credits"
}