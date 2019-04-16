const { RichEmbed } = require('discord.js');
const GOOGLE_API_KEY = process.env.YTAPI;
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');

async function playCommand(client, msg, args){
	if(!args.length) return msg.channel.send(exports.help.usage, { code: 'asalWehCodemah' });
	try{
		if(!GOOGLE_API_KEY) throw TypeError('NO GOOGLE KEY IN ENV >:(');
		const youtube = new YouTube(GOOGLE_API_KEY);
		
		const vc = msg.member.voiceChannel;
		if(!vc) return msg.channel.send('😡 | Join vc first');
		if(!vc.permissionsFor(client.user).has(['CONNECT', 'SPEAK'])) return msg.channel.send('🚫 | Missing perm **CONNECT** or **SPEAK**');
		if(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/.test(args[0])){
			const playlist = await youtube.getPlaylist(args[0]);
			const videos = await playlist.getVideos();
			for (const video of Object.values(videos)) {
				const vid = await youtube.getVideoByID(video.id);
				await handleVideo(vid, msg, vc, true);
			}
			return msg.channel.send(`✅ Playlist: **${playlist.title}** has been added to the queue!`);
		}
		if(/https?:\/\//gi.test(args[0])){
			const video = await youtube.getVideo(args[0]);
			return handleVideo(video, msg, vc);
		}
		const videos = await youtube.searchVideos(args.join(' '), 1);
		if(!videos.length) return msg.channel.send('🚫 | No result found');
		const video = await youtube.getVideoByID(videos[0].id);
		return handleVideo(video, msg, vc);
	} catch (err) {
		return msg.channel.send(err.stack, { code: 'ini' });
	}
}

async function handleVideo (video, msg, voiceChannel, hide = false){
	const queue = msg.client.queue.get(msg.guild.id);
	const song = {
		id: video.id,
		title: video.title,
		url: `https://www.youtube.com/watch?v=${video.id}`,
    img: `http://i3.ytimg.com/vi/${video.id}/maxresdefault.jpg`,
    durationh: video.duration.hours,
		durationm: video.duration.minutes,
		durations: video.duration.seconds,
    duration: video.duration,
    desc: video.description,
		author: msg.author,
		video
	}
	if(!queue){
		try{
			msg.channel.send(`If you like our bot, dont forget to give upvote on DBL!\nLink: https://discordbots.org/bot/518697409849720832/vote`);
			const connection = await voiceChannel.join();
			const Queue = {
				channel: msg.channel,
				voiceChannel,
				connection,
				songs: [song],
				volume: 50,
				playing: true,
				loop: false
			}
			//thisMess.delete();
			msg.client.queue.set(msg.guild.id, Queue);
			return play(msg, song);
		}catch(e){
			msg.client.queue.delete(msg.guild.id);
			return msg.channel.send(e.stack, { code: 'diff' } );
		}
	}
	queue.songs.push(song);
  let embed = new RichEmbed()
  .setAuthor(`Added queue`)
  .setTitle(song.title)
  .setURL(song.url)
  .setImage(song.img)
	if(!hide) return msg.channel.send(embed);
}

function play(msg, song){
	const queue = msg.client.queue.get(msg.guild.id);
	if(!song){
    msg.channel.send('Music Ended!')
		queue.voiceChannel.leave();
		return msg.client.queue.delete(msg.guild.id);
	}
	const vid = ytdl(song.url, {filter: 'audioonly' }, {quality: 'small'});
	const dispatcher = queue.connection.playStream(vid)
	.on('end', res => {
		const shifed = queue.songs.shift();
		if(queue.loop) queue.songs.push(shifed);
		play(msg, queue.songs[0]);
	})
	.on('error', console.error);
	dispatcher.setVolumeLogarithmic(queue.volume /100);
  let embed = new RichEmbed()
  .setAuthor(`Start playing`)
  .setTitle(song.title)
  .setURL(song.url)
  .setImage(song.img)
	queue.channel.send(embed);
}

this.conf = {
	aliases: ['fp'],
	cooldown: 2
}

this.help = {
	name: 'forceplay',
	description: 'play song using youtube videos',
	usage: 'forceplay <query | link | playlist>'
}

this.run = playCommand;