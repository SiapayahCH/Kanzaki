const Discord = require('discord.js');
const { RichEmbed } = require('discord.js');
const GOOGLE_API_KEY = process.env.YTAPI;
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');
const bot = new Discord.Client();
const config = bot.config = require('../../config.json');
const radio = require('../../radio.json')


module.exports.run = async (bot, message, args) => {
  
  /*let embed = new Discord.RichEmbed()
  const youtube = new YouTube(GOOGLE_API_KEY);
  const vid = ytdl("https://www.youtube.com/watch?v=bV-ccAW3e2I", {filter: 'audioonly' });
  const connection = await msg.member.voiceChannel.join();
  
  if (!msg.member.voiceChannel) return msg.channel.send('<:tick:445752370324832256> You are not on a voice channel.');
	if (!msg.member.voiceChannel.joinable) return msg.channel.send("<:tick:445752370324832256> I\'m unable to play music in this channel.");

	const dispatcher = connection.playStream(vid)*/
  let voiceCenel = message.member.voiceChannel;
  if (!voiceCenel) return message.channel.send({embed: { description: 'Join room please!?'}})
  
  message.member.voiceChannel.join().then(x => x.playStream('https://listen.moe/kpop/stream'));
//  	const vid = ytdl("https://listen.moe/kpop/stream", {filter: 'audioonly' }, {quality: 'small'});
  message.channel.send({embed: {description: '🎶 KPOP Radio' }})


}

exports.conf = {
    aliases: [],
    cooldown: 1
  }

module.exports.help = {
  name: "kpop",
  description: "Play KPop radio",
  usage: "kpop"
}