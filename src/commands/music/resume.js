exports.run = async (bot, msg, args) => {
  
  const serverQueue = bot.queue.get(msg.guild.id)
  
      if (serverQueue && !serverQueue.playing) {
			serverQueue.playing = true;
			serverQueue.connection.dispatcher.resume();
			return msg.channel.send({ embed: { description: '▶ Resumed the music for you!'}});
		}
		return msg.channel.send({ embed: { description: 'There is nothing playing.'}});
  return undefined;
}

exports.conf = {
  aliases: [],
  cooldown: '2'
}

exports.help = {
  name: 'resume',
  description: 'Resume the music',
  usage: 'resume'
}