const Discord = require('discord.js');
const { RichEmbed } = require('discord.js');
const GOOGLE_API_KEY = process.env.YTAPI;
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');
const bot = new Discord.Client();
const config = bot.config = require('../../config.json');

module.exports.run = async (bot, message, args) => {
  
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