const db = require('quick.db')
var blocked = new db.table('block')
const { owners_id } = require("../../config.json");

exports.run = async (client, message, args, color) => {

  owners_id.forEach(async function(owner) {
    if (message.author.id !== owner) return;
    
    const user = message.mentions.users.first().id || client.users.get(args[0]).id
    
    blocked.add(`has_${user}`)
  })
}

exports.conf = {
  aliases: [],
  cooldown: "0"
}

exports.help = {
  name: "block"
}