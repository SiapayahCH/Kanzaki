const Discord = require("discord.js");
const cpuStat = require('cpu-stat');
const os = require("os") 
const { dependencies } = require('../../../package.json');
const { Canvas } = require('canvas-constructor');
const moment = require('moment');
require('moment-duration-format');
const v = require('../../config.json').v
const client = new Discord.Client();
const DBL = require("dblapi.js");
const dbl = new DBL(process.env.DBL_TOKEN, client);

exports.run = async (client, message, args, color, prefix) => {
  
    let start = Date.now();
    let diff = (Date.now() - message.createdTimestamp);
    let API = (client.ping).toFixed(2)
  
    let botGuilds = client.guilds.size
    let botChannels = client.guilds.reduce((c, d) => c + d.channels.size, 0).toLocaleString()
    let botUsers = client.guilds.reduce((a, b) => a + b.memberCount, 0).toLocaleString()
    
    cpuStat.usagePercent(function(err, percent, seconds) {
    if (err) {
      return console.log(err);
    }
      
    dbl.getBot(client.user.id).then(bot => {
      
      const embed = new Discord.RichEmbed()
		.setColor(color)
		.setThumbnail(client.user.displayAvatarURL)
		.setTitle('My current statistics')
		.addField("General Statistic",`\`\`\`asciidoc
Uptime         : ${client.util.parseDur(client.uptime)} 
Users          : ${botUsers}
Channels       : ${botChannels}
Servers        : ${botGuilds}
Queue          : ${client.queue.size} \`\`\``)
      .addField("System Usage Statistic", `\`\`\`asciidoc
CPU Usage      : ${percent.toFixed(2)} %
Memory Usage   : ${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)} MB\`\`\``)
      .addField("System Statistic", `\`\`\`asciidoc
Discord.js     : v${Discord.version}
Node           : ${process.version}
Version Bot    : v${v}
CPU            : ${os.cpus().map(i => `${i.model}`)[0]}
Arch           : ${os.arch()}
Platform       : ${os.platform()}\`\`\``)
      .addField("DBL Info", `\`\`\`asciidoc
Votes This Month: ${bot.monthlyPoints}
Total Votes     : ${bot.points}
Bot Lib         : ${bot.lib}\`\`\``)
  .addField('📌 Creators', `• ${client.config.owners_id.map(x => `${client.users.get(x).username}#${client.users.get(x).discriminator}`).join('\n• ')}`) 
  .addField('📌 Co-Creators | Helpers', `• ${client.config.coowners_id.map(x => `${client.users.get(x).username}#${client.users.get(x).discriminator}`).join('\n• ')}`) 
  .addField('📌 Partners', `• ${client.config.partners_id.map(x => `${client.users.get(x).username}#${client.users.get(x).discriminator}`).join('\n• ')}`)
	//.addField('📌 Dependencies', Object.entries(dependencies).map(x => parseDependencies(x[0], x[1])).join(', '))
  .setFooter('Latency: '+diff+' | API: '+API);
	if(args[0] === '--memory' || args[0] === '--mem' || args[0] === '--m'){
			const attachment = getChart(client.health);
			embed.attachFile({ attachment, name: 'memory.png' })
			.setImage('attachment://memory.png');
		}
     return message.channel.send(embed) 
  })  
    })
}
function parseDependencies (name, src){
	if(src.startsWith('github:')){
		const repo = src.replace('github:', '').split('/');
		return `[${name}](https://github.com/${repo[0]}/${repo[1].replace(/#.+/, '')})`;
	}
	return `[${name}](https://npmjs.com/${name})`;
}

function getChart({prc, ram}){
	let canvas = new Canvas(481, 289)
	.setColor('white')
	.addRect(0,0,481,289)
	.setTextFont('10px Impact')
	.setTextAlign('right')
	.setColor('black');

	for(let i = 10; i >= 0; i--){
		const post = i*17+52;
		canvas = canvas.addText(String((-i+10)*10), 27, post)
	}

	for(let i = 0; i < 11; i++){
		const post = i*17+49;
		canvas = canvas.moveTo(38, post)
		.lineTo(466, post);
	}

	canvas = canvas.stroke()
	.setTextAlign('center');

	const moment = require('moment');
	const now = new Date();
	const terval = now.setHours(now.getHours() - 1);
	const dates = new Array(6).fill(terval)
	.map((x, i) => x-((-i+5)*6000)).map(x => moment(x).format('mm:ss'));
	for(let i = 0; i < 6; i++){
		const post = i*71+73;
		canvas = canvas.addText(String(dates[i]), post, 240);
	}

	canvas = canvas.setTextFont('15px Impact')
	.addText('RAM PERCENTAGE', 481/2, 28);

	const renders = [renderData(prc, '#FF8000', 'RAM (Total)', true), renderData(ram, '#3498DB', 'RAM (Used)', false)];
	for(const render of renders){
		canvas = canvas.addImage(render, 0, -7);
	}
	return canvas.toBuffer();
}

function renderData(arr, color, text, sec){
	let canvas = new Canvas(481, 289)
	const datas = arr.slice(-6);

	for(let i = 0; i < 6; i++){
		const postX = i*71+73;
		const postY = (-((datas[i]/100)*177)+177)+49;
		canvas = canvas.lineTo(postX, postY);
	}

	canvas = canvas.setStroke(color)
	.setLineWidth(2)
	.stroke()
	.save()
	.setColor(color);

	for(let i = 0; i < 6; i++){
		const postX = i*71+73;
		const postY = (-((datas[i]/100)*177)+177)+49;
		canvas = canvas.addCircle(postX, postY, 4);
	}

	canvas = canvas.setColor('black')
	.setTextFont('10px Impact')
	.setTextAlign('left')
	.addText(text, sec ? 269 : 178, 268)
	.setColor(color)
	.addRect(sec ? 250 : 161,258,13,13);

	return canvas.toBuffer();
}

exports.conf = {
  aliases: ['botinfo', 'about', 'st', 'stat'], 
  cooldown: '5'
} 
exports.help = {
  name: 'stats', 
  description: 'show current statistic bot',
  usage: 'stats', 
  example: ['stats'] 
} 

/*const config = require('../../config.json')
const Discord = require("discord.js");
let v = config.v
const cpuStat = require('cpu-stat');
const { dependencies } = require('../../../package.json');
const { Canvas } = require('canvas-constructor');
const moment = require('moment');
require('moment-duration-format');

exports.run = async(client, message, args, color, prefix) => {
  
  function convertMS(ms) {
    var d, h, m, s;
    s = Math.floor(ms / 1000);
    m = Math.floor(s / 60);
    s = s % 60;
    h = Math.floor(m / 60);
    m = m % 60;
    d = Math.floor(h / 24);
    h = h % 24;
    return {
        d: d
        , h: h
        , m: m
        , s: s
    };
};
  
  let u = convertMS(client.uptime);
  let uptime = u.h + " hours | " + u.m + " minutes | " + u.s + " seconds"
  
  let guildsEval = await client.shard.broadcastEval('this.guilds.size')
  let channelsEval = await client.shard.broadcastEval('this.channels.size')
  let usersEval = await client.shard.broadcastEval('this.users.size')
  let botGuilds = guildsEval.reduce((prev, val) => prev + val)
  let botChannels = channelsEval.reduce((prev, val) => prev + val)
  let botUsers = usersEval.reduce((prev, val) => prev + val)
  
  cpuStat.usagePercent(function(err, percent, seconds) {
    if (err) {
      return console.log(err);
    }

    const embed = new Discord.RichEmbed()
		.setColor('BROWN')
		.setThumbnail(client.user.displayAvatarURL)
		.addField(`General Statistic`, `\`\`\`asciidoc
Users       : ${botUsers.toLocaleString()}
Channels : ${botChannels.toLocaleString()}
Servers    : ${botGuilds.toLocaleString()}\`\`\``, true)
    .addField('Bot Core', `\`\`\`asciidoc
Uptime         : ${uptime}
WS Ping       : ${client.ping.toFixed(2)}ms
CPU Usage  : ${percent.toFixed(2)} %
MEM Usage : ${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)} MB
Bot Vers.      : ${v}
Discord.js     : v${Discord.version}
Node            : ${process.version}\`\`\``, true)
    .addField('📌 Owners', `•${config.owners_id.map(x => `${client.users.get(x).username}#${client.users.get(x).discriminator}`).join('\n•')}`) 
    .addField('📌 Dependencies', Object.entries(dependencies).map(x => parseDependencies(x[0], x[1])).join(', '));

		return message.channel.send(embed);
})
}
  
  function parseDependencies (name, src){
	if(src.startsWith('github:')){
		const repo = src.replace('github:', '').split('/');
		return `[${name}](https://github.com/${repo[0]}/${repo[1].replace(/#.+/, '')})`;
	}
	return `[${name}](https://npmjs.com/${name})`;
}
  
exports.conf = {
	aliases: [],
	cooldown: 0
}

exports.help = {
	name: 'stats',
	description: 'Show bot statistic',
	usage: 'stats'
}*/
