const { RichEmbed } = require('discord.js');
const config = require('../../config.json')

exports.run = async(client, message, args, color, prefix) => {
  
  try {
var x = await client.shard.broadcastEval('`Shard: [${this.shard.id+1} / ${this.shard.count}]\nGuild: ${this.guilds.size}\nUser: ${this.users.size}\nChannel: ${this.channels.size}\nPing: ${this.ping.toFixed(2)}ms`')

  let embed = new RichEmbed() 
  .setColor(color)
  .setThumbnail(client.user.displayAvatarURL) 
  .setTitle('Shards Information') 
  .setDescription(`This guild is running on shards ${client.shard.id+1} of ${client.shard.count}...\n\n${x.join('\n\n')}`)
  .setFooter(`${client.user.username} ${config.v}`)
  return message.channel.send(embed)
  } catch (err) {
    message.channel.send(err.message);
  } 
} 

exports.conf = {
  aliases: ["shardinfo"],
  ownerOnly: true
}

exports.help = {
  name: "shardsinfo"
}