const { RichEmbed } = require('discord.js');

exports.run = async (client, msg, args) => {
  
  const serverQueue = msg.client.queue.get(msg.guild.id);
  
  var volval;
    if (serverQueue.volume == 5) {
        volval = `○─────────────────── ⠀`
    }
    if (serverQueue.volume == 10) {
        volval = `─○────────────────── ⠀`
    }
    if (serverQueue.volume == 15) {
        volval = `──○───────────────── ⠀`
    }
    if (serverQueue.volume == 20) {
        volval = `───○──────────────── ⠀`
    }
    if (serverQueue.volume == 25) {
        volval = `────○─────────────── ⠀`
    }
    if (serverQueue.volume == 30) {
        volval = `─────○────────────── ⠀`
    }
    if (serverQueue.volume == 35) {
        volval = `──────○───────────── ⠀`
    }
    if (serverQueue.volume == 40) {
        volval = `───────○──────────── ⠀`
    }
    if (serverQueue.volume == 45) {
        volval = `────────○─────────── ⠀`
    }
    if (serverQueue.volume == 50) {
        volval = `─────────○────────── ⠀`
    }
    if (serverQueue.volume == 55) {
        volval = `──────────○───────── ⠀`
    }
    if (serverQueue.volume == 60) {
        volval = `───────────○──────── ⠀`
    }
    if (serverQueue.volume == 65) {
        volval = `────────────○─────── ⠀`
    }
    if (serverQueue.volume == 70) {
        volval = `─────────────○────── ⠀`
    }
    if (serverQueue.volume == 75) {
        volval = `──────────────○───── ⠀`
    }
    if (serverQueue.volume == 80) {
        volval = `───────────────○──── ⠀`
    }
    if (serverQueue.volume == 85) {
        volval = `────────────────○─── ⠀`
    }
    if (serverQueue.volume == 90) {
        volval = `─────────────────○── ⠀`
    }
    if (serverQueue.volume == 95) {
        volval = `──────────────────○─ ⠀`
    }
    if (serverQueue.volume == 100) {
        volval = `──────────────────○ ⠀`
    }
  
	try{
		if(!serverQueue) return msg.channel.send('Not Playing anything right now');
		const progBar = this.getProgressBar(serverQueue);
    const curentDurationMinute = Math.floor(serverQueue.connection.dispatcher.time/60000) < 10 ? `0${Math.floor(serverQueue.connection.dispatcher.time/60000)}` : Math.floor(serverQueue.connection.dispatcher.time/60000);
	  const currentDurationSeconds = Math.floor((serverQueue.connection.dispatcher.time%60000)/1000) < 10 ? `0${Math.floor((serverQueue.connection.dispatcher.time%60000)/1000)}` : Math.floor((serverQueue.connection.dispatcher.time%60000)/1000);
    const endDurationMinute = serverQueue.songs[0].duration.minutes < 10 ? `0${serverQueue.songs[0].duration.minutes}` : serverQueue.songs[0].duration.minutes;
  	const endDurationSeconds = serverQueue.songs[0].duration.seconds < 10 ? `0${serverQueue.songs[0].duration.seconds}` : serverQueue.songs[0].duration.seconds;
		const dur = this.getTime(serverQueue);
		const embed = new RichEmbed()
		.setColor('RED')
		.setAuthor('Now Playing')
		//.setTitle(serverQueue.songs[0].title)
    //.setURL(serverQueue.songs[0].url)
		//.setThumbnail(`https://i.ytimg.com/vi/${serverQueue.songs[0].id}/default.jpg?width=80&height=60`)
		.setDescription(`__[${serverQueue.songs[0].title}](${serverQueue.songs[0].url})__\n${curentDurationMinute}:${currentDurationSeconds} ${progBar} ${endDurationMinute}:${endDurationSeconds}\n              ⇆ㅤㅤㅤㅤ◁ㅤㅤ❚❚ㅤㅤ▷ㅤㅤㅤㅤ↻\n${volval}`);
		return msg.channel.send(embed);
	}catch(e){
		return msg.channel.send(`Oh no an error occured :( \`${e.message}\` try again later`);
	}
}

exports.getProgressBar = (serverQueue)=> {
  const duration = (serverQueue.songs[0].duration.minutes*60000) + ((serverQueue.songs[0].duration.seconds%60000)*1000);
	const percent = serverQueue.connection.dispatcher.time/duration;
	const num = Math.floor(percent*12);
	let str = '';
	for(let i = 0; i < 12; i++){
		str += i === num ? '●' : '━';
  }
	return str;
}

exports.getTime = (serverQueue) => {
	const curentDurationMinute = Math.floor(serverQueue.connection.dispatcher.time/60000) < 10 ? `0${Math.floor(serverQueue.connection.dispatcher.time/60000)}` : Math.floor(serverQueue.connection.dispatcher.time/60000);
	const currentDurationSeconds = Math.floor((serverQueue.connection.dispatcher.time%60000)/1000) < 10 ? `0${Math.floor((serverQueue.connection.dispatcher.time%60000)/1000)}` : Math.floor((serverQueue.connection.dispatcher.time%60000)/1000);
	const endDurationMinute = serverQueue.songs[0].duration.minutes < 10 ? `0${serverQueue.songs[0].duration.minutes}` : serverQueue.songs[0].duration.minutes;
	const endDurationSeconds = serverQueue.songs[0].duration.seconds < 10 ? `0${serverQueue.songs[0].duration.seconds}` : serverQueue.songs[0].duration.seconds;
	return `[${curentDurationMinute}:${currentDurationSeconds} - ${endDurationMinute}:${endDurationSeconds}]`;
}

exports.conf = {
  aliases: ['np'],
  cooldown: '5'
}

exports.help = {
  name: 'nowplaying',
  description: 'Show current song playing',
  usage: 'nowplaying'
}