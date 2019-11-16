const { RichEmbed } = require('discord.js');
const { bot_prefix, embed_color } = require('../config.json');
const Discord = require('discord.js')
const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app)

module.exports = async (client, message, args) => {
  
	let	prefix = bot_prefix
  
  client.afk = new Map()
  
  if (message.author.bot || !message.guild) return;
    
    let msg = message.content.toLowerCase();
    
    if (msg.startsWith(prefix)) {
        try {
        require('../handle/command')(client, message);
        } catch(e) {
            console.error(e);
        }
    } 
  
    var wave = [':wave:']
    let awave = Math.floor(Math.random() * wave.length);
  
    var hi = ['Hi', 'hi', 'Hello', 'hello']
    let ahi = Math.floor(Math.random() * hi.length)
    
    var custommessage = [`my prefix on this server is \`${prefix}\``]
    let acustommessage = Math.floor(Math.random() * custommessage.length)
  
    if (msg == `<@${client.user.id}>` || msg == `<@!${client.user.id}>`) {
					message.channel.send(`**${message.member.user.tag}** my prefix for this server is \`${prefix}\``)
				}
    }