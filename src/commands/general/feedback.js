const Tiramitzu = require('discord.js');
const TRMZ = require('../../config.json');
let version = TRMZ.v

module.exports.run = (client, message, args) => {
  
  let feed = args.join("")
  if(!feed) return message.channel.send("Please give us a feedback not blank field!")
  
  const Trmzsend = new Tiramitzu.RichEmbed()
  .setAuthor(`Feedback`, client.user.displayAvatarURL)
  .addField(':warning: **| New feedback recieved!**', `Feedback: \`${feed}\`\nFounder Username: ${message.author.username}\nFounder ID: ${message.author.id}`)
  .setThumbnail(message.author.displayAvatarURL)
  .setColor("AQUA")
  .setFooter(`Feedback by: ${message.author.tag} | Bot Version ${version}`)
  .setTimestamp();
  
  client.users.get('446941102315012097').send(Trmzsend)
  
  message.react('495912768390561793')
  message.channel.send('<:Staff:498202466437824541> **| Thanks for you feedback, we will receive your feedback with** `' + args.join(" ") + '`!')
}

exports.conf = {
    aliases: ['fb', 'feed'],
    cooldown: 10
}

exports.help = {
  name: "feedback",
  description: "Send feedback to my owner",
  usage: "feedback <type>"
}