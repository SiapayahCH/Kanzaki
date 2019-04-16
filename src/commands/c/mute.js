const Discord = require("discord.js");
const ms = require("ms");
const botconfig = require('../../config.json')
const version = botconfig.v

module.exports.run = async (bot, message, args) => {

    if (!message.member.hasPermissions('MUTE_MEMBERS')) return message.channel.send("You need **MUTE_MEMBERS** permissions for use this command.")
    const modlog = message.guild.channels.find(channel => channel.name === 'mod-logs');
    const mod = message.author;
    let user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!user) return message.channel.send("Couldn't find user.")
    let reason = message.content.split(" ").slice(2).join(" ");
    if (!reason) return message.channel.send('lease specify a reason for the mute!')
    let muterole = message.guild.roles.find(`name`, "Muted");
    if(args[0] == "help"){
      message.reply("Usage: !kn.mute <user> <reason>");
      return;
    }
  let muteChannel = message.guild.channels.find(`name`, "mod-logs");
  if(!muterole) {
    } else {
      message.channel.send('This server haven\t \`Muted\` role!')
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

    await (user.addRole(muterole.id));
    const muteembed = new Discord.RichEmbed()
            .setAuthor(' Action | Mute', `https://images-ext-2.discordapp.net/external/Wms63jAyNOxNHtfUpS1EpRAQer2UT0nOsFaWlnDdR3M/https/image.flaticon.com/icons/png/128/148/148757.png`)
            .addField('User', `<@${user.id}>`)
            .addField('Reason', `${reason}`)
            .addField('Moderator', `${mod}`)
            .setColor('#D9D900')
      		  .setFooter("Bot Version "+version, bot.user.displayAvatarURL)
        message.channel.send(`**<@${user.id}> has been muted by: ${mod} reason: ${reason}**`)
  
  
}


exports.conf = {
    aliases: [],
    cooldown: '5'
  }

module.exports.help = {
    name: "mute",
    description: "mute user",
    usage: "mute <user> <reason>"
}
