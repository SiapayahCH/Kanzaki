const Discord = require("discord.js");
const botconfig = require("../../config.json");
const version = botconfig.v

module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(`You need **BAN_MEMBERS** permissions to use this command.`)
    if(bUser.hasPermission("MANAGE_MEMBERS")) return message.channel.send("That person can't be banned!");
    let bUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if(!bUser) return message.channel.send("Can't find user!");
    let bReason = args.join(" ").slice(22);

    let banEmbed = new Discord.RichEmbed()
    .setAuthor(" Action | Ban", `https://images-ext-2.discordapp.net/external/bs8dWv1gtMJxSyxXMpiJSdYSH62d63BF8yuwMwl3fbM/http/icons.iconarchive.com/icons/paomedia/small-n-flat/1024/sign-ban-icon.png`)
    .setColor("#FF0000")
    .addField("User", `${bUser}`)
    .addField("Executor", `<@${message.author.id}>`)
    .addField("Reason", bReason)
    .setFooter("Bot Version "+version, bot.user.displayAvatarURL);
  
    let banChannel = message.guild.channels.find(`name`, "mod-logs");
  
    message.guild.member(bUser).ban(bReason);
    message.channel.send(`**<@${bUser}> has been banned by: <@${message.author.id}> reason: ${bReason}**`);
}

exports.conf = {
    aliases: [],
    cooldown: '5'
  }

exports.help = {
  name: "ban",
  usage: "!kn.ban <user> <reason>",
  description: "Banned user"
}