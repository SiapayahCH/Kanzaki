exports.run = async (client, message, args) => {
  
  let msg = args.join(' ')
  
  if(!msg) return message.channel.send('Format: {prefix}say <msg>')
  
  message.delete
  message.channel.send(msg)
  
}

exports.conf = {
  aliases: [],
  cooldown: "5"
}

exports.help = {
  name: "say",
  description: "make bot say something",
  usage: "say <msg>"
}
