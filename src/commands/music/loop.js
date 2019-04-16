exports.run = async (client, msg, args) => {
	const serverQueue = client.queue.get(msg.guild.id);
  const voiceChannel = msg.member.voiceChannel
	if (!msg.member.voiceChannel) return msg.channel.send({ embed : { description: 'You must join voice channel first' }});
	if(serverQueue.voiceChannel.id !== msg.member.voiceChannel.id) return msg.channel.send({ embed: { description: `You must be in **${serverQueue.voiceChannel.name}** to loop the queue` }});
	if(!serverQueue) return msg.channel.send({ embed : { description: 'Are you sure? nothing to loop because queue is empty' }});
	try{
		serverQueue.loop = !serverQueue.loop;
		if(serverQueue.loop) return msg.channel.send({ embed : { description: '✅ Loop Is On' }});
		return msg.channel.send({ embed: { description: '✅ Loop Is Off' }});
	}catch(e){
		return msg.channel.send(`Oh no an error occured :( \`${e.message}\` try again later`);
	}
}

exports.conf = {
  aliases: ['repeat'],
  cooldown: '5'
}

exports.help = {
  name: 'loop',
  description: "Loop all queue",
  usage: "loop"
}