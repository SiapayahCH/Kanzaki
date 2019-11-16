const { owners_id, coowners_id } = require("../../config.json");
const { RichEmbed } = require("discord.js");
const { post } = require('node-superfetch');
const path = require("path");
const SQL = require("sqlite3").verbose();
let Discord = require("discord.js")
const ytdl = require('ytdl-core');
//let xp = require("../../Storage/userData.json");

exports.run = async (client, message, args, color) => {
  var msg = message;
  var serverQueue = client.queue.get(msg.guild.id)
  var bot = client;
  var Kanzaki = client;
  var Kaori = client;
  var kanzaki = client;
  var kaori = client;

  coowners_id.forEach(async function(coowner) {
  owners_id.forEach(async function(owner) {
    if (message.author.id !== owner && message.author.id !== coowner) return;

    const embed = new RichEmbed()
    .setColor(color)
    //.addField('Input', '```js\n' + args.join(" ") + '```')

    try {
      const code = args.join(" ");
      if (!code) return;
      let evaled;
      if (code.includes(`token`)) {
        evaled = 'LOSER GBLK!!! >:VVVVV';
      } else {
        evaled = eval(code);
      }
      var tipe2 = {
        "string": "String",
        "number": "Number",
        "boolean": "Boolean",                
        "array": "Array",
        "object": "Object",
        "function": "Function"
      }
      var tipe1 = typeof evaled
      var tipe = tipe2[tipe1]

      if (typeof evaled !== "string")
      evaled = require('util').inspect(evaled, { depth: 0});

      let output = clean(evaled);
      if (output.length > 1024) {
          const { body } = await post('https://www.hastebin.com/documents').send(output);
          embed.addField('Output', `https://www.hastebin.com/${body.key}.js`);
      } else {
          embed.addField('Output', '```js\n' + output + '```');
          embed.addField('Type', '```js\n'+ tipe +'```')
      }
      message.channel.send(embed);
    } catch (e) {
      let error = clean(e);
      if (error.length > 1024) {
          const { body } = await post('https://www.hastebin.com/documents').send(error);
          embed.addField('Error', `https://www.hastebin.com/${body.key}.js`);
      } else {
          embed.addField('Error', '```js\n' + error + '```');
      }
      message.channel.send(embed);
    }
  })
  });
}

function clean(text) {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}

exports.conf = {
  aliases: ["ev", "e"],
  cooldowns: '0',
  ownerOnly: true
} //k

exports.help = {
  name: "eval",
  description: "evaluated",
  usage: "eval {some super javascript code}"
}
