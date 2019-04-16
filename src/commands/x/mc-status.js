const Discord = require('discord.js'),
      superagent = require('superagent');
const config = require('../../config.json')
const v = config.v
const footer = config.footer

exports.run = async (client, message, args) => {
  
  var {body} = await superagent
              .get('http://mcapi.us/server/status?ip='+args[0]+'&Port25565')
  
  var status = body["online"]
  var motd = body["motd"]
  var onlen = body["players"]
  var max = body["players"]
  var motd = body["motd"]
  var version = body["server"]
  var icon = body["favicon"]
  var time = body["duration"]
  
  if(status === true) var status = "Online"


  if(status === false) var status = "Offline"
  
  let embed = new Discord.RichEmbed()
  .setAuthor(`Information for server with IP: ${args[0]} and Port: 25565`)
  .setColor("GREEN")
  .setDescription(`** **\n**Players:**\n${onlen.now}/${max.max}\n**MOTD:**\n${motd} (Not support color MOTD!)\n**Status:**\n${status}\n**Version:**\n${version.name}\n**Time online:**\n${client.util.parseDur(time)}`)
  .setFooter(`${footer} ${message.author.tag}`)
  .setTimestamp();
  
  message.channel.send(embed)
  
}

exports.conf = {
  aliases: [],
  cooldown: "2"
}

exports.help = {
  name: "mc-status",
  description: "Show the minecraft server status",
  usage: "mc-status <ip>"
}