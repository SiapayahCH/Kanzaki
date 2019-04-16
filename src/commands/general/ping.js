const Discord = require('discord.js')
const config = require('../../config.json')
const version = config.v
const footer = config.footer

exports.run = async (client, message, args, color) => {

    let start = Date.now();
    let diff = (Date.now() - start); 
    let API = (client.ping).toFixed(2)
        
        let embed = new Discord.RichEmbed()
        .setColor("RED")
        .addField(":ping_pong: Pong!", `\`${diff}ms\` to send this message.`, true)
        .addField("💻 API", `\`${API}ms\``, true)
        .setFooter(`${footer} ${message.author.tag}`)
        .setTimestamp();
        return message.channel.send("***Please wait...***").then(async msg => {
                        setTimeout(() => {
                            msg.edit(embed);
                        }, 1500);
        });
    };

exports.conf = {
    aliases: [],
    cooldown: ""
}

exports.help = {
    name: "ping",
    description: "Ping the bot to see if there are latecny issues.",
    usage: "ping"
}