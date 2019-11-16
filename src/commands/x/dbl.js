const Discord = require("discord.js") 
const client = new Discord.Client();
const DBL = require("dblapi.js");
const dbl = new DBL(process.env.DBL_TOKEN, client);

exports.run = async (client, message, args) => {
  
  let prefix = 'k?'
  
  let aembed = new Discord.RichEmbed()
  .setColor("BLUE")
  .setAuthor("Correct usage:")
  .setDescription(`\`\`\`asciidoc
${prefix}dbl info <@mention | ID>      :    Full info about the bot on DBL.

${prefix}dbl widget <@mention | ID>    :    Full widget of bot (large).

${prefix}dbl owner <@mention | ID>     :    Widget bot owner (small).

${prefix}dbl status <@mention | ID>    :    Widget bot status (small).

${prefix}dbl upvotes <@mention | ID>   :    Widget bot total upvotes (small).

${prefix}dbl servers <@mention | ID>   :    Widget bot total servers (small).

${prefix}dbl lib <@mention | ID>       :    Widget bot libraries (small).\`\`\``)
  .addField("**Note:**", "***Please make sure the bot you mention is available on [Discord Bot List](https://discordbots.org/) and ONLY BOT NOT HUMAN!!***")
  
  if(!args[0] || `${args[0]}` === `help`) {
    return message.channel.send(aembed)  
    
    return
  } 
    
  if(`${args[0]}` === `info`) {
    
    let user = message.mentions.users.first() || client.users.get(args[1]);
    if(!user) return message.channel.send('Please mention bot')
      
    dbl.getBot(user.id).then(bot => {
    
      let embed = new Discord.RichEmbed()
      .setColor("RED")
      .setAuthor(`DBL info for ${user.tag}`, `https://cdn.discordapp.com/emojis/488262079644565505.png?v=1`)
      .setThumbnail(user.displayAvatarURL)
      .addField(`** **`, `\`\`\`\n${bot.shortdesc}\n\`\`\`\n** **\n**Monthly Votes:** ${bot.monthlyPoints}\n**Total Votes:** ${bot.points}\n**Lib:** ${bot.lib}\n**Prefix:** ${bot.prefix}\n**Tags:** ${bot.tags}\n**Certified?** ${bot.cerified ? bot.certified.name : '`The bot isn\'t certified`'}\n**Posted Guild Count:** ${bot.server_count}\n**Posted Shard Count:** ${bot.shardCount ? bot.shardCount.name: "`This is soon!`"}\n**Approved at:** ${bot.date}\n** **\n[DBL Page](https://discordbots.org/bot/${user.id}) | [Invite](${bot.invite}) | ${bot.support} | [Github](${bot.github}) | [Website](${bot.website})`)
      
      
      
      message.channel.send(embed)
    });
    return;
  }
  
  if(`${args[0]}` === `owner`) {
    let user = message.mentions.users.first() || client.users.get(args[1]);
    if(!user) return message.channel.send('Please mention bot')
    if (user) user = `https://discordbots.org/api/widget/owner/${user.id}.png`;
    
    let oEmbed = new Discord.RichEmbed() 
    .setColor("RED") 
    .setTitle('bot_owner.png')
    .attachFile({attachment: user, name: `bot_owner.png`})
    .setImage('attachment://bot_owner.png') 
    message.channel.send(oEmbed);
    return;
  }
  
  if(`${args[0]}` === `widget`) {
    let user = message.mentions.users.first() || client.users.get(args[1]);
    if(!user) return message.channel.send('Please mention bot')
    if (user) user = `https://discordbots.org/api/widget/${user.id}.png`;
    
    let oEmbed = new Discord.RichEmbed() 
    .setColor("RED") 
    .setTitle('bot_widget.png')
    .attachFile({attachment: user, name: `bot_widget.png`})
    .setImage('attachment://bot_widget.png') 
    message.channel.send(oEmbed);
    return;
  }
  
  if(`${args[0]}` === `lib`) {
    let user = message.mentions.users.first() || client.users.get(args[1]);
    if(!user) return message.channel.send('Please mention bot')
    if (user) user = `https://discordbots.org/api/widget/lib/${user.id}.png`;
    
    let oEmbed = new Discord.RichEmbed() 
    .setColor("RED") 
    .setTitle('bot_lib.png')
    .attachFile({attachment: user, name: `bot_lib.png`})
    .setImage('attachment://bot_lib.png') 
    message.channel.send(oEmbed);
    return;
  }
  
  if(`${args[0]}` === `servers`) {
    let user = message.mentions.users.first() || client.users.get(args[1]);
    if(!user) return message.channel.send('Please mention bot')
    if (user) user = `https://discordbots.org/api/widget/servers/${user.id}.png`;
    
    let oEmbed = new Discord.RichEmbed() 
    .setColor("RED") 
    .setTitle('bot_servers.png')
    .attachFile({attachment: user, name: `bot_servers.png`})
    .setImage('attachment://bot_servers.png') 
    message.channel.send(oEmbed);
    return;
  }
  
  if(`${args[0]}` === `status`) {
    let user = message.mentions.users.first() || client.users.get(args[1]);
    if(!user) return message.channel.send('Please mention bot')
    if (user) user = `https://discordbots.org/api/widget/status/${user.id}.png`;
    
    let oEmbed = new Discord.RichEmbed() 
    .setColor("RED") 
    .setTitle('bot_status.png')
    .attachFile({attachment: user, name: `bot_status.png`})
    .setImage('attachment://bot_status.png') 
    message.channel.send(oEmbed);
    return;
  }
  
  if(`${args[0]}` === `upvotes`) {
    let user = message.mentions.users.first() || client.users.get(args[1]);
    if(!user) return message.channel.send('Please mention bot')
    if (user) user = `https://discordbots.org/api/widget/upvotes/${user.id}.png`;
    
    let oEmbed = new Discord.RichEmbed() 
    .setColor("RED") 
    .setTitle('bot_upvotes.png')
    .attachFile({attachment: user, name: `bot_upvotes.png`})
    .setImage('attachment://bot_upvotes.png') 
    message.channel.send(oEmbed);
    return;
  }
  
}

exports.conf = {
    aliases: [],
    cooldown: 0
  }

exports.help = {
  name: "dbl",
  description: "Showing DBL info of bot",
  usage: "dbl <@mention | ID> <info | owner | widget | lib | upvotes | status | servers>"
}