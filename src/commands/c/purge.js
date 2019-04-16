const Discord = require("discord.js");
const botconfig = require("../../config");
const version = botconfig.v

module.exports.run = async (bot, message, args, messages) => {

  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("No.");
  if(!args[0]) return message.channel.send("no");
  message.channel.bulkDelete(args[0]).then(() => {
  message.channel.send(`Clear ${args[0]} messages.`).then(msg => msg.delete(2000));
});

}

exports.conf = {
    aliases: ['prune', 'clear']
}

module.exports.help = {
  name: "purge",
  usage: "!kn.purge <amount>",
  description: "Purge message(s)"
}