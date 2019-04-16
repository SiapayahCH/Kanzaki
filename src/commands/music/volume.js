exports.run = async (client, msg, args) => {
  
  const Discord = require('discord.js')

const serverQueue = client.queue.get(msg.guild.id)
   if (!msg.member.voiceChannel) return msg.channel.send({ embed: { description: 'You are not in a voice channel!'}});
		if (!serverQueue) return msg.channel.send({ embed: { description: 'There is nothing playing.'}});
    var botRoleColorSync = msg.guild.member(client.user).highestRole.color;
		if (!args[0]) return msg.channel.send({embed: { description: `The current volume is: **${serverQueue.volume}**%`}});
		serverQueue.volume = args[0];
    if (args[0] > 101) return msg.channel.send({ embed: { description: `${msg.author} Volume limit is 100%, please do not hurt yourself!`}});
    serverQueue.volume = args[0];
    if (args[0] > 101) return !serverQueue.connection.dispatcher.setVolumeLogarithmic(args[0] / 100) +
    msg.channel.send({ embed: { description: `${msg.author} Volume limit is 100%, please do not hurt yourself!`}});
 
    if (args[0] < 101) return serverQueue.connection.dispatcher.setVolumeLogarithmic(args[0] / 100) + msg.channel.send({ embed: { description: `I set the volume to: __**${args[0]}**%__`}});
	}

  exports.conf = {
    aliases: [],
    cooldown: '5'
  }
exports.help = {
  name: 'volume',
  description: 'Set the volume.',
  usage: 'volume <number>'
}