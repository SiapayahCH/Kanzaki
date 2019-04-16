const Discord = require("discord.js")

module.exports  = async (client, guild) => {
    const invite = await guild.channels.find(c => c.type !== "category" && c.position === 0).createInvite({
        maxAge: 0
    });
    let guildCreateChannel = client.channels.get('567294859329667082');
    let joinEmbed = new Discord.RichEmbed()
    .setTitle(client.user.username+" joined server!")
    .setThumbnail(guild.iconURL)
    .addField(`Server Name:`, `${guild.name}`)
    .addField(`Server ID:`, `${guild.id}`)
    .addField(`Server Owner:`, `${guild.owner}`)
    .addField(`Server Invite:`, `${invite.url}`)
    .setColor("GREEN")
    .setFooter(`${client.user.username}`)
    .setTimestamp();
    guildCreateChannel.send(joinEmbed);
}