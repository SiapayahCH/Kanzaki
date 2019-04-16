const Discord = require("discord.js")

module.exports = (client, guild) => {
    let guildCreateDelete = client.channels.get('567294859329667082');
    let leaveEmbed = new Discord.RichEmbed()
    .setTitle("Bot left server!")
    .setThumbnail(guild.iconURL)
    .addField(`Server Name:`, `${guild.name}`)
    .addField(`Server ID:`, `${guild.id}`)
    .addField(`Server Owner:`, `${guild.owner}`)
    .setColor("RED")
    .setFooter(`${client.user.username}`)
    .setTimestamp();
    guildCreateDelete.send(leaveEmbed);
}