const { Canvas } = require('canvas-constructor');
const { RichEmbed } = require('discord.js');
const { get } = require('node-superfetch');
const { loadImage } = require('canvas');

exports.run = async (client, msg, args) => {
  if (msg.author.id !== "446941102315012097") return;
  const { body: plate } = await get('https://i.imgur.com/f8SpAXm.png');
  const { body: plate1 } = await get('https://cdn.discordapp.com/attachments/512962492817735691/521857729984200744/JPEG_20181210_172757.jpg');
  const { body: plate2 } = await get('https://cdn.discordapp.com/attachments/512962492817735691/521866293520105492/stars.jpg')

  const { body: avatar } = await get(`${msg.author.avatarURL}`);
  const name = msg.author.tag.length > 20 ? msg.author.tag.substring(0, 17) + "..." : msg.author.tag;
	const ping = Date.now();
  let user = msg.author.tag;
	const regex = /https?:\/\/.+\.(?:png|jpg|jpeg)/gi;
	if(args.length < 1) return args.missing(msg, 'No code provided', this.help);
	const embed = new RichEmbed();
	let input = `\`\`\`js\n${args.join(' ')}\`\`\``;
	if(input.length > 1204) input = await client.util.hastebin(args.join(' '));
	embed.addField('📥 INPUT', input);
	try{
  const avatar = (await client.snek.get(msg.author.avatarURL || client.user.avatarURL)).body;
		let code = args.join(' ');
		if(!code.startsWith('new Canvas')) throw new Error('the command cannot execute without new Canvas(high, width)');
		if(!code.includes('.toBufferAsync()')) code += '.toBufferAsync()';
		code.replace(/;/g, '');
		code.replace(regex, async (con)=> {
			const { body } = await client.snek.get(con);
			return body;
		});
		const evaled = await eval(code);
		embed.setColor('#00FF12');
		embed.addField('📤 OUTPUT', '\u200B');
		embed.attachFile({attachment: evaled, name: 'canvas.png'});
    embed.setImage('attachment://canvas.png');
		embed.setFooter(`⏱️ ${Date.now() - ping}ms`);
		return msg.channel.send(embed);
	}catch(e){
		let err = `\`\`\`ini\n${e.message}\`\`\``;
		if(err.length > 1204) err = await client.util.hastebin(e.message);
		embed.setColor('#FF1200');
		embed.addField('⛔ ERROR', err);
		embed.setFooter(`⏱️ ${Date.now() - ping}ms`);
		return msg.channel.send(embed);
	}
}

exports.conf = {
  aliases: ['cv'],
  cooldown: ''
}

exports.help = {
  name: 'canvas',
  description: 'test a canvas-constructor code',
  usage: 'canvas <code>'
}