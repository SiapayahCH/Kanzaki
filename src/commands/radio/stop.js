const { RichEmbed } = require('discord.js');
const GOOGLE_API_KEY = process.env.YTAPI;
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');

exports.run = async (client, message, args) => {
  
  let msg = message
  
  const queue = msg.client.queue.get(msg.guild.id);
  
  let bot = client
  
     if (!message.member.voiceChannel) return message.channel.send('Please connect to voice channel.');
      
        if (!message.guild.me.voiceChannel) return message.channel.send('Sorry, Im not connected to guild.');
      
        if (message.guild.me.voiceChannelID !== message.member.voiceChannelID) return message.channel.send('sorry, you are not connected to the same channel.'); 
      
        //if (!client.commands.get("jpop", "kpop").run(bot, message, args)) return;

        if (queue) return;
      
        message.channel.send('Leaving Channels ...').then(async msg => {
                        setTimeout(() => {
                            message.guild.me.voiceChannel.leave()
                            msg.edit('Success!!');
                        }, 1500);
        });
}


exports.conf = {
   aliases: [],
  cooldown: 7
}

exports.help = {
  name: "leave",
  description: "Stop Music Radio",
  usage: "leave"
}