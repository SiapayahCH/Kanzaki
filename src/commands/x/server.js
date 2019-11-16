const Discord = require("discord.js");
const moment = require("moment");
const config = require('../../config.json')
const version = config.v
const footer = config.footer
var verificationLevels = [`\`None\``, `\`Low\``, `\`Medium\``, `\`(╯°□°）╯︵ ┻━┻\` (High)`, `\`┻━┻彡 ヽ(ಠ益ಠ)ノ彡┻━┻\` (Extreme)`]; 
var region = {
    "brazi": " :flag_br: **| Brazil**",
    "eu-central": ":flag_eu: **| Central Europe**",
    "singapore": ":flag_sg: **| Singapore**",
    "us-central": ":flag_us: **| U.S. Central**",
    "sydney": ":flag_au: **| Sydney**",
    "us-east": ":flag_us: **| U.S. East**",
    "us-south": ":flag_us: **| U.S. South**",
    "us-west": ":flag_us: **| U.S. West**",
    "eu-west": ":flag_eu: **| Western Europe**",
    "singapore": ":flag_sg: **| Singapore**",
    "london": ":flag_gb: **| London**",
    "japan": ":flag_jp: **| Japan**",
    "russia": ":flag_ru: **| Russia**",
    "hongkong": ":flag_hk: **| Hong Kong**"
  }

module.exports.run = async (bot, message, args) => {
  
  let guild = bot.guilds.get(args[1]);
  if(!guild) guild = message.guild
  let guild1 = bot.guilds.get(args[0]);
  if(!guild1) guild1 = message.guild
  
  
  if(`${args[0]}` === `info`) {
  
    let sicon = guild.iconURL;
    let serverembed = new Discord.RichEmbed()
    .setAuthor(guild.name, sicon)
    .setColor("RED")
    .setThumbnail(sicon)
    .addField(":credit_card: | ID", guild.id, true)
    .addField(":earth_americas: | Server Region", `${region[guild.region]}`, true)
    .addField("<:verified:506093476279091232> | Verification Level", `${verificationLevels[guild.verificationLevel]}`, true)
    .addField(":busts_in_silhouette: | Members", guild.memberCount, true)
    .addField(':busts_in_silhouette: | Member Status', `<a:G_online:506091555220619275> **${guild.members.filter(m => m.presence.status === 'online').size}** <a:G_invisible:506092046570749972> **${guild.members.filter(m => m.presence.status === 'offline').size}** \n<a:G_idle:506092093798744064> **${guild.members.filter(m => m.presence.status === 'idle').size}** <a:G_dnd:506092076652298243> **${guild.members.filter(m => m.presence.status === 'dnd').size}**`, true)
    .addField(":clock9: | Created At", moment.utc(guild.createdAt).format('dddd, MMMM Do YYYY, HH:mm:ss'), true)
    .addField(`:satellite: | Channels [${guild.channels.size}]`, `- **${guild.channels.filter(m => m.type === 'category').size}** Category \n- **${guild.channels.filter(m => m.type === 'text').size}** Text \n- **${guild.channels.filter(m => m.type === 'voice').size}** Voice`, true)
    .addField("👤 | Founder", `<@${guild.owner.user.id}> | \`${guild.owner.user.tag}\``, true)
    .addField(`🔒 | Roles [${guild.roles.size}]`, `To see a list all roles\nuse **k?server roles**`, true)
    .addField(`:mag_right: | Emojis [${guild.emojis.size}]`, `To see a list all emojis\nuse **k?server emojis**`, true)
    .setFooter(`${footer} ${message.author.tag}`)
    .setTimestamp();

    message.channel.send(serverembed);
    return;
}
  
  if(`${args[0]}` === `roles`) {
    const embed = require('discord.js').RichEmbed;


	let number = guild.roles.array().sort().map((x,i) => `\`${i+1}\` - ${x}`)//.join('\n')
	number = chunk(number, 10);

	let index = 0;
  const ge = new embed ()
  .setColor("RED")
  .setAuthor(` | Roles List [${guild.roles.size}]`, bot.user.displayAvatarURL)
  .setDescription(number[index].join('\n'))
  .setFooter(`Page ${index+1} of ${number.length}`)
	const m = await message.channel.send(ge);
	await m.react('⬅');
  await m.react('🔴');
	await m.react('➡');
	async function awaitReaction(){
    const filter =(rect, usr) => ['⬅', '🔴','➡' ].includes(rect.emoji.name) && usr.id === message.author.id
		const response = await m.awaitReactions(filter, {
			max: 1,
			time: 30000
		});
		if(!response.size){
			return undefined;
		}
		const emoji = response.first().emoji.name;
		if(emoji === '⬅') index--;
    if(emoji === '🔴')  m.delete();
		if(emoji === '➡') index++;
    
		index = ((index % number.length) + number.length) % number.length;
		ge.setDescription(number[index].join('\n'))
    ge.setFooter(`Page ${index+1} of ${number.length}`)
		await m.edit(ge);
		return awaitReaction();
	}
	return awaitReaction();

}
function chunk(array, chunkSize) {
    const temp = [];
    for(let i = 0; i < array.length; i+= chunkSize){
      temp.push(array.slice(i, i+chunkSize));
    }
    return temp;
    return;
  }
  
  if(args[0] === `emojis`) {
    const WxArtzEmbedBiarSyantik = require('discord.js').RichEmbed;

	let number = guild.emojis.array().map((x,i)=> `${i+1} - ${x} (${x.id}) (${x.name})`)
	number = chunk(number, 10);
  
  if (!number) return message.channel.send("Sorry, this server not have emoji")

	let index = 0;
  const ge = new WxArtzEmbedBiarSyantik()
  .setColor("RED")
  .setAuthor(`| Server Emote List`, guild.iconURL)
  .addField(`${guild.owner.user.tag}`, `(${guild.ownerID})`)
  .setDescription(number[index].join('\n'))
  .setFooter(`Page ${index+1} of ${number.length}`)
	const m = await message.channel.send(ge);
	await m.react('⬅');
  await m.react('🔴');
	await m.react('➡');
	async function awaitReaction(){
    const filter =(rect, usr) => ['⬅', '🔴','➡' ].includes(rect.emoji.name) && usr.id === message.author.id
		const response = await m.awaitReactions(filter, {
			max: 1,
			time: 30000
		});
		if(!response.size){
			return undefined;
		}
		const emoji = response.first().emoji.name;
		if(emoji === '⬅') index--;
    if(emoji === '🔴')  m.delete();
		if(emoji === '➡') index++;
    
		index = ((index % number.length) + number.length) % number.length;
		ge.setDescription(number[index].join('\n'))
    ge.setFooter(`Page ${index+1} of ${number.length}`)
		await m.edit(ge);
		return awaitReaction();
	}
	return awaitReaction();

}
function chunk(array, chunkSize) {
    const temp = [];
    for(let i = 0; i < array.length; i+= chunkSize){
      temp.push(array.slice(i, i+chunkSize));
    }
    return temp;
    return;
  }
  
  if(`${args[0]}` == `icon`) {
    let serverembed = new Discord.RichEmbed()
    
    .setImage(guild.iconURL)
    message.channel.send(serverembed)
    return;
  }
  
    let sicon = guild1.iconURL;
    let serverembed = new Discord.RichEmbed()
    .setAuthor(guild.name, sicon)
    .setColor("RED")
    .setThumbnail(sicon)
    .addField(":credit_card: | ID", guild1.id, true)
    .addField(":earth_americas: | Server Region", `${region[guild1.region]}`, true)
    .addField("<:verified:506093476279091232> | Verification Level", `${verificationLevels[guild1.verificationLevel]}`, true)
    .addField(":busts_in_silhouette: | Members", guild1.memberCount, true)
    .addField(':busts_in_silhouette: | Member Status', `<a:G_online:506091555220619275> **${guild1.members.filter(m => m.presence.status === 'online').size}** <a:G_invisible:506092046570749972> **${guild1.members.filter(m => m.presence.status === 'offline').size}** \n<a:G_idle:506092093798744064> **${guild1.members.filter(m => m.presence.status === 'idle').size}** <a:G_dnd:506092076652298243> **${guild1.members.filter(m => m.presence.status === 'dnd').size}**`, true)
    .addField(":clock9: | Created At", moment.utc(guild1.createdAt).format('dddd, MMMM Do YYYY, HH:mm:ss'), true)
    .addField(`:satellite: | Channels [${guild1.channels.size}]`, `- **${guild.channels.filter(m => m.type === 'category').size}** Category \n- **${guild1.channels.filter(m => m.type === 'text').size}** Text \n- **${guild1.channels.filter(m => m.type === 'voice').size}** Voice`, true)
    .addField(`🔒 | Roles [${guild1.roles.size}]`, `To see a list all roles\nuse **k?server roles**`, true)
    .addField(`:mag_right: | Emojis [${guild1.emojis.size}]`, `To see a list all emojis\nuse **k?server emojis**`, true)
    .setFooter(`${footer} ${message.author.tag}`)
    .setTimestamp();

    message.channel.send(serverembed);
  
}

exports.conf = {
    aliases: ['s'],
    cooldonw: 0
}

module.exports.help = {
  name:"server",
  description: "server command with: `info`, `roles`, `emojis`",
  usage: "server <info | roles | emojis>"
}