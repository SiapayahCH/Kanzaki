const Discord = require('discord.js'),
      superagent = require('superagent');

/*
 * Buatan anak bangsa
 * DBD API
 *
 * DwiiUnknown :'v
 */



exports.run = async (client, message, args) => {

 var {body} = await superagent
              .get('https://discordbots-dev.tru.io/api/bots')
 
// console.log(body)
 
  let user = message.mentions.users.first() || client.users.get(args[0]);
  
  if (!user) return message.reply("Please tag a valid DBD Bot")
  
  // console.log(body[user.id])
  
  var bot = body[user.id];
  
  let botowntag = client.users.get(bot.ownerID);
  
  if (bot.accepted === true) bot.accepted = 'Approved to DiscordBots Development'
  
  let embed = new Discord.RichEmbed()
  .setAuthor(`DBD Information for ${user.tag}`, 'https://cdn.discordapp.com/icons/411750522345881621/3b994c6894d2a05c22b06371457330c1.jpg')
  .addField('Bot Username', `${user} | ${user.tag}`, true)
  .addField('Bot ID:', `${user.id}`, true)
  .addField('Bot Owner:', `<@${bot.ownerID}> | ${bot.ownerID} | ${botowntag.tag}`, true)
  .addField('Bot Prefix:', `**${bot.prefix}**`, true)
  .addField('Registration:', `${bot.accepted}`, true)
  .setFooter('Powered by DiscordBots Development API')
  .setThumbnail(user.displayAvatarURL)
  .setColor('RED')
  
  message.channel.send(embed)
             

}

exports.conf = {
  aliases: ['discordbotsdevelopment', 'dbdevelopment', 'dbdev'],
  cooldown: 5
}

exports.help = {
  name: "dbd",
  description: "Show DiscordBots Indonesia bot stats",
  usage: "dbd <@mention | ID>"
}