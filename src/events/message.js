const { Canvas } = require('canvas-constructor');
const { RichEmbed } = require('discord.js');
const { get } = require('node-superfetch');
const { loadImage } = require('canvas');
const snekfetch = require('snekfetch')
const { bot_prefix, embed_color } = require('../config.json');
//let xp = require("../Storage/userData.json");
const fs = require('fs')
const Discord = require('discord.js')
const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app)
//const DBL = require("dblapi.js");
//const dbl = new DBL(process.env.DBL_TOKEN, { webhookPort: 5000, webhookAuth: 'password' });

module.exports = async (client, message, args) => {
  
/*dbl.on('posted', () => {
  console.log('Server count posted!');
})

dbl.on('error', e => {
 console.log(`Oops! ${e}`);
})
  
dbl.webhook.on('ready', hook => {
  console.log(`Webhook running at http://${hook.hostname}:${hook.port}${hook.path}`);
});
dbl.webhook.on('vote', vote => {
  console.log(`User with ID ${vote.user} just voted!`);
});*/
  
	let	prefix = bot_prefix
  
  client.afk = new Map()
  
  if (message.author.bot || !message.guild) return;
  
  /*let xpAdd = Math.floor(Math.random() * 1) + 1;
  //console.log(xpAdd);

  if(!xp[message.author.id]){
    xp[message.author.id] = {
      xp: 0,
      level: 1
    };
  }
  let curlvl = xp[message.author.id].level;
  async function createCanvas() {
  const imageUrlRegex = /\?size=2048$/g;
  const { body: avatar } = await get(message.author.displayAvatarURL.replace(imageUrlRegex, "?size=128"));
    
return new Canvas(89, 104)
.addBeveledImage(avatar, 17,5,57,58,10,true)
.setStroke('white')
.setLineWidth(2)
.stroke()
.setColor('#00BDFF')
.addBeveledRect(28,51,34,19,10,true)
.stroke()
.setColor('gray')
.addBeveledRect(0,76,89,27,10)
.setColor('white')
.setTextFont('18px Anal')
.setTextAlign('left')
.addText('LEVEL UP', 3,96)
.setTextAlign('center')
.setTextFont('15px Roboto-Regular')
.addText(curlvl + 1,46,66)
.toBufferAsync();
}
    
  /*dbl.webhook.on('vote', vote => {
    console.log(`User with ID ${vote.user} just voted!`);
});
  
  let curxp = xp[message.author.id].xp;
  let nxtLvl = 500
  xp[message.author.id].xp =  curxp + xpAdd;
  if(nxtLvl <= xp[message.author.id].xp){
    xp[message.author.id].level = curlvl + 1;
    xp[message.author.id].xp = 0;
    
    var canvas = await createCanvas();
    
    let lvlup = new Discord.RichEmbed()
    .attachFile(new Discord.Attachment(canvas, 'level_up.png'))

    message.channel.send(lvlup).then(msg => {msg.delete(1000)});
  }
  fs.writeFile("./src/Storage/userData.json", JSON.stringify(xp), (err) => {
    if(err) console.log(err)
  })*/
        
    //if(blocked.get(`has_${message.author.id}`)) return;
    
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