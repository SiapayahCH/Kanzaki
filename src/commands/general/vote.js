const Discord = require("discord.js")
const client = new Discord.Client()
const DBL = require("dblapi.js");
const dbl = new DBL(process.env.DBL_TOKEN, client);
const config = require('../../config.json')
const footer = config.footer

exports.run = async (client, message, args) => {
  
  let userid = message.mentions.users.first() || client.users.get(args[0]);
  if(!userid) userid = message.author
  
  const vote = new Discord.RichEmbed()
  .setAuthor('You can vote Kirayuni now!')
  .setColor("RANDOM")
  .setTimestamp()
  .setDescription(`[Link 1](https://discordbots.org/bot/518697409849720832/vote)\n[Link 2](https://bit.ly/RanmaVoteDBL)`)
  
  const hasvote = new Discord.RichEmbed()
  .setDescription('You only can vote every 12 hours, come back later')
  .setColor("RANDOM")
  .setFooter(`${footer} ${message.author.tag}`)
  .setTimestamp();

  dbl.hasVoted(userid.id).then(voted => {
    if (!voted) {
      message.channel.send(vote)
    } else {
      return message.channel.send(hasvote)
    }
});
 
}

exports.conf = {
  aliases: [],
  cooldown: "5"
}

exports.help = {
  name: "vote",
  description: "Vote for Kirayuna",
  usage: "vote"
}