const Discord = require("discord.js"); 
const botconfig = require("../../config.json");
const version = botconfig.v
const footer = botconfig.footer

exports.run = async (bot, message, args) => { 
  
  let arg = args[0]
  if(!arg) arg = message.author.username
  let role = new RegExp(arg, "gi");
  let user = bot.users.array().find(r => r.username.match(role))
  
  if(`${args[0]}` === `server` || `${args[0]}` === `guild`) {
    let sicon = message.guild.iconURL;
    let embed = new Discord.RichEmbed()
        .setAuthor(`${message.guild.name}'s Avatar`)
        .addField(`Links`, `[Click here](${sicon})`)
        .setImage(message.guild.displayIconURL)
        .setColor(message.guild.me.highestRole.color)
        .setFooter(`${footer} ${message.author.tag}`)
        .setTimestamp();
    return message.channel.send("***Generating guild avatar...***").then(async msg => {
                        setTimeout(() => {
                            msg.edit(embed);
                        }, 1500);
        });
    return;
  }

    if(!user) user = message.author

    let embed = new Discord.RichEmbed()
        .setAuthor(`${user.username}'s Avatar`)
        .addField(`Links`, `[Click here](${user.avatarURL})`)
        .setImage(user.displayAvatarURL)
        .setColor(message.guild.me.highestRole.color)
        .setFooter(`${footer} ${message.author.tag}`)
        .setTimestamp();
    return message.channel.send("***Generating avatar...***").then(async msg => {
                        setTimeout(() => {
                            msg.edit(embed);
                        }, 1500);
        });
}

exports.conf = {
    aliases: ['ava'],
    cooldown: '5'
}

module.exports.help = {
  name:"avatar",
  description: "Show user avatar",
  usage: "avatar <@mention | ID>"
}