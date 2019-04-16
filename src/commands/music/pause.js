exports.run = async (bot, msg, args) => {
  
  const serverQueue = bot.queue.get(msg.guild.id)
  
if (serverQueue && serverQueue.playing) {
			serverQueue.playing = false;
			serverQueue.connection.dispatcher.pause();
			return msg.channel.send({ embed: { description: '⏸ Paused the music for you!'}});
		}
		return msg.channel.send({ embed: { description: 'There is nothing playing.'}});
  }
  
exports.conf = {
  aliases: [],
  cooldown: '5'
}

exports.help = {
  name: 'pause',
  description: 'Pause the music,',
  usage: 'pause'
}