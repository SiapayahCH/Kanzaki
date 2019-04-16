const { Canvas } = require('canvas-constructor');
const { RichEmbed } = require('discord.js');
const { get } = require('node-superfetch');
const { loadImage } = require('canvas');
const snekfetch = require('snekfetch');
const Discord = require('discord.js');
const db = require('quick.db');
const mem = new db.table('memberData')
const moment = require('moment')
var milkitas = new db.table('kiracoins')
var slot = new db.table("slot")
//let xp = require("../../Storage/userData.json");

exports.run = async (client, message, args) => {
  
  let arg = args[0]
  if(!arg) arg = message.author.username
  let role = new RegExp(arg, "gi");
  let user = client.users.array().find(r => r.username.match(role))
  
  const inbal = db.get(`coins_${user.id}`)
  const slottotal = slot.get(`totals_${user.id}`)
  
  if(!inbal) db.set(`coins_${user.id}`, 0)
  if(!slottotal) slot.set(`totals_${user.id}`, 0)
  
  let kiracoins = client.util.nFormatter(inbal)
  
  async function createCanvas() {
  const imageUrlRegex = /\?size=2048$/g;
  
  /*if(!xp[user.id]){
   xp[user.id] = {
     xp: 0,
     level: 1
  };
}
    
  let curxp = xp[user.id].xp;
  let curlvl = xp[user.id].level;
  let nxtLvlXp = curlvl * 300;
  let difference = nxtLvlXp - curxp;
    
  let xper = client.util.nFormatter(curxp)*/
    
  let role = message.member.highestRole;
    
  const { body: avatar } = await get(user.displayAvatarURL.replace(imageUrlRegex, "?size=128"));
  const name = user.tag.length > 20 ? user.tag.substring(0, 17) + "..." : user.tag;
  
  return new Canvas(400, 250)
    .setColor("#7289DA")
    .addRect(84, 0, 316, 250)
    .setColor("#62d62c")
    .addRect(0, 0, 84, 250)
    .setColor("#042768")
    .addRect(169, 26, 231, 46)
    .addRect(224, 130, 176, 46)
    .addRect(194, 78, 210, 46)
    .addRect(40, 190, 150, 46)
    .setShadowColor("rgba(22, 22, 22, 1)")
    .setShadowOffsetY(5)
    .setShadowBlur(10)
    .save()
    .addCircle(84, 90, 62)
    .addRoundImage(avatar, 20, 26, 128, 128, 64)
    .setTextAlign("center")
    .setTextFont("10pt Discord")
    .setColor("#FFFFFF")
    .addText(name, 285, 54)
    //.addText(`Level: ${curlvl}`, 298, 105)
    .setTextAlign("left")
    //.addText(`XP: ${xper}`, 241, 158)
    .addText(`RanCoins: ${kiracoins}`, 211, 105)
    .addText(`Total Slots: ${slottotal}`, 50, 220)
    .restore()
    .createBeveledClip(20, 138, 128, 32, 5)
    .setColor("#23272A")
    .addRect(20, 138, 128, 32)
    .restore()
    .setTextAlign("center")
    .setTextFont("10pt Discord")
    .setColor("#FFFFFF")
    .addText(name, 285, 54)
    //.addText(`Level: ${curlvl}`, 84, 159)
    .setTextAlign("left")
    .addText(`SOON`, 241, 136)
    .restore()
    .toBufferAsync()
  }
  
  var canvas = await createCanvas();
  
  const embed = new Discord.RichEmbed()
  .attachFile(new Discord.Attachment(canvas, 'profile.png'))
  
  message.channel.send(embed)
  
}
exports.conf = {
  aliases: ["ppc", "level"]
};

exports.help = {
  name: "profile",
  description: "Display user profile.",
  usage: "profile"
};