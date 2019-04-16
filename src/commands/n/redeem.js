var codes = ["merrychristmas", "holidays", "newyear"]
const db = require('quick.db')
var redeemed = new db.table('redeemed')
var milkitas = new db.table('kiracoins')

exports.run = async (client, message, args) => {
  
  message.delete()
  
  let codess = args.join(" ")
  
  let redeem = redeemed.get(`redeem_${message.author.id}`)
  
  if(!codess.includes(codes)) return message.channel.send("Haven't a code? Vote first and contact @Tiramitzu#0335")
  
  if(`${redeem}` === `1`) { 
    return message.channel.send("The codes is allready used!")
  }  
  if(`${redeem}` === `2`) { 
    return message.channel.send("The codes is allready used!")
  }
  if(`${redeem}` === `3`) { 
    return message.channel.send("The codes is allready used!")
  }
  if(codess.includes('merrychristmas')) {
    message.channel.send("You has successfully redeem and got 642 RanCoins!")
    redeemed.set(`redeem_${message.author.id}`, 1)
    db.add(`coins_${message.author.id}`, 642)
    return;
  }
  if(codess.includes('holidays')) {
    message.channel.send("You has successfully redeem and got 772 RanCoins!")
    redeemed.set(`redeem_${message.author.id}`, 2)
    db.add(`coins_${message.author.id}`, 772)
    return;
  }
  if(codess.includes('newyear')) {
    message.channel.send("You has successfully redeem and got 10000 RanCoins!")
    redeemed.set(`redeem_${message.author.id}`, 3)
    db.add(`coins_${message.author.id}`, 10000)
    return;
  }
}
exports.conf = {
  aliases: [],
  cooldown: "0"
}

exports.help = {
  name: "redeem",
  description: "redeem code",
  usage: "redeem <code>"
}