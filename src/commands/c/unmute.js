const Discord = require("discord.js");
const ms = require("ms");
const botconfig = require("../../config");
const version = botconfig.version

module.exports.run = async (bot, message, args) => {

    if (!message.member.hasPermissions('MUTE_MEMBERS')) return message.channel.send("You need **MUTE_MEMBERS** permissions for use this command.")
    const modlog = message.guild.channels.find(channel => channel.name === 'mod-logs');
    const mod = message.author;
    let user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!user) return message.channel.send("Couldn't find user.")
    let reason = message.content.split(" ").slice(2).join(" ");
    if (!user.roles.find(`name`, "Muted")) return message.channel.send('There are\'t in muted.')
    if (!reason) return message.channel.send('lease specify a reason for the mute!')
    let muterole = message.guild.roles.find(`name`, "Muted");
    if(args[0] == "help"){
      message.reply("Usage: k!unmute <user> <reason>");
      return;
    }
  let muteChannel = message.guild.channels.find(`name`, "mod-logs");
    if (!muterole) {
        try {
            muterole = await message.guild.createRole({
                name: "Muted",
                color: "#000000",
                permissions: []
            })
            message.guild.channels.forEach(async (channel, id) => {
                await channel.overwritePermissions(muterole, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false
                });
            });
        } catch (e) {
            console.log(e.stack);
        }
    }
  

    let mutetime = args[1];

    await (user.removeRole(muterole.id));
    const muteembed = new Discord.RichEmbed()
            .setAuthor(' Action | UnMute', `https://images-ext-2.discordapp.net/external/wKCsnOcnlBoNk-__BXsd6BrO6YddfUB-MtmaoaMxeHc/https/lh3.googleusercontent.com/Z5yhBQBJTSJVe5veJgaK-9p29hXm7Kv8LKF2oN0hDnsToj4wTcQbirR94XVpH4Lt5a5d%3Dw300`)
            .addField('User', `<@${user.id}>`)
            .addField('Reason', `${reason}`)
            .addField('Moderator', `${mod}`)
            .setColor('#00FF80')
      		  .setFooter("Bot Version "+version, bot.user.displayAvatarURL)
        message.channel.send.send(`<${user.id}> has been unmuted by: ${mod}`)
  
  
}


exports.conf = {
    aliases: [],
    cooldown: '5'
  }

module.exports.help = {
    name: "unmute",
    description: "unmute user",
    usage: "unmute <user>"
}