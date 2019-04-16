const Discord = require("discord.js");
const db = require('quick.db');
var milkitas = new db.table('kiracoins')

module.exports.run = async (bot, message, args) => {
  
  let user = message.mentions.users.first() || bot.users.get(args[0]);
  
  var amount = args[1]
          
  let bal = db.get(`coins_${message.author.id}`)
  if(!bal) bal = 0
  if(amount !== isNaN) return message.channel.send('You only can send number for amount!')
  if (message.author.id == user.id) return message.channel.send(`You cannot send credits to yourself lol`)
  if(amount < 10) return message.channel.send(`<:no:435160985259737099> | You cannot send money under **10**`)
  if (!user) return message.channel.send('<:no:435160985259737099> | Reply the user you want to send money to!')
  if (!amount) return message.channel.send('<:no:435160985259737099> | Specify the amount you want to pay!')
  if (bal < amount) return message.channel.send('<:no:435160985259737099> | You have less coins than the amount you want to transfer!')
  
  db.subtract(`coins_${message.author.id}`, amount)
  db.add(`coins_${user.id}`, amount)
  message.channel.send(`Transfer ${amount} to ${user.tag}, has successfully!`);        
  
}

exports.conf = {
    aliases: [],
    cooldown: 1
  }

module.exports.help = {
  name: "transfer",
  description: "transfering your money",
  usage: "transfer <@mention | ID>"
}