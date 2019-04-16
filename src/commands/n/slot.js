const slots = ['⚾', '🎾', '🏐', '🏀', '⚽'];
const db = require("quick.db")
var milkitas = new db.table('kiracoins')
var slot = new db.table("slot")

exports.run = async(client, message, args) => {
  
  let bet = args[0]
  if(!bet) bet = 10;
  if(bet > 100) bet = 100;

  //let prizewin = bet * 50
  //let prizewinsamasamabeda = bet * 5
  //let prizewinbedasamasama = bet * 5
  //let prizewinsamabedasama = bet * 3

  //ZONK LOL             //1 !== 2 | 1 !== 3 | 2 !== 3
  let prize1 = bet * 10  //1 === 2 | 1 === 3 | 2 === 3
  let prize2 = bet * 5  //1 !== 2 | 1 !== 3 | 2 === 3
  let prize3 = bet * 5  //1 === 2 | 1 !== 3 | 2 !== 3
  let prize4 = bet * 5  //1 !== 2 | 1 === 3 | 2 !== 3

  let prizelose = bet

  let slotOne = slots[Math.floor(Math.random() * slots.length)];
  let slotTwo = slots[Math.floor(Math.random() * slots.length)];
  let slotThree = slots[Math.floor(Math.random() * slots.length)];
  let slotFour = slots[Math.floor(Math.random() * slots.length)];
  let slotFive = slots[Math.floor(Math.random() * slots.length)];
  let slotSix = slots[Math.floor(Math.random() * slots.length)];
  let slotSeven = slots[Math.floor(Math.random() * slots.length)];
  let slotEight = slots[Math.floor(Math.random() * slots.length)];
  let slotNine = slots[Math.floor(Math.random() * slots.length)];

  let balance = db.get(`coins_${message.author.id}`)
  if(!balance) balance = 0
  
  if (bet < 10) return message.channel.send(`<:no:435160985259737099> You cannot bet money under **10**`)
  if (balance < bet) return message.channel.send(`<:no:435160985259737099> You don't have enough RanCoins!`);

  if (slotOne === slotTwo && slotOne === slotThree) { // 1 === 2 | 1 === 3 | 2 === 3
    db.add(`coins_${message.author.id}`, prize1)
    slot.add(`totals_${message.author.id}`, 1)
        return message.channel.send(`**[ :slot_machine: | SLOTS ]**\n------------------\n${slotFour} : ${slotFive} : ${slotSix}\n\n${slotOne} : ${slotTwo} : ${slotThree}** <**\n\n${slotSeven} : ${slotEight} : ${slotNine}\n------------------\n**| : : : : WIN : : : : |**\n**<a:afroggyO:498689476990861313> ${message.author.username}** used **>${bet}** and won **${prize1}**!`)
  }

  if (slotOne !== slotTwo && slotOne !== slotThree && slotTwo !== slotThree) { //1 !== 2 | 1 !== 3 | 2 !== 3
    db.subtract(`coins_${message.author.id}`, bet)
    slot.add(`totals_${message.author.id}`, 1)
    return message.channel.send(`**[ :slot_machine: | SLOTS ]**\n------------------\n${slotFour} : ${slotFive} : ${slotSix}\n\n${slotOne} : ${slotTwo} : ${slotThree}** <**\n\n${slotSeven} : ${slotEight} : ${slotNine}\n------------------\n**| : : :  LOST  : : : |**\n<a:alllyaSpaz:499380183342514176> **${message.author.username}** used **${bet}** and lost everything.`)
  }

  if (slotOne !== slotTwo && slotOne !== slotThree && slotTwo !== slotThree) { //1 !== 2 | 1 !== 3 | 2 === 3
    db.add(`coins_${message.author.id}`, prize2)
    slot.add(`totals_${message.author.id}`, 1)
        return message.channel.send(`**[ :slot_machine: | SLOTS ]**\n------------------\n${slotFour} : ${slotFive} : ${slotSix}\n\n${slotOne} : ${slotTwo} : ${slotThree}** <**\n\n${slotSeven} : ${slotEight} : ${slotNine}\n------------------\n**| : : : : WIN : : : : |**\n**${message.author.username}** used **${bet}** and won **${prize2}**!`)
  }

  if (slotOne === slotTwo && slotOne !== slotThree && slotTwo !== slotThree) { //1 === 2 | 1 !== 3 | 2 !== 3
    db.add(`coins_${message.author.id}`, prize3)
    slot.add(`totals_${message.author.id}`, 1)
        return message.channel.send(`**[ :slot_machine: | SLOTS ]**\n------------------\n${slotFour} : ${slotFive} : ${slotSix}\n\n${slotOne} : ${slotTwo} : ${slotThree}** <**\n\n${slotSeven} : ${slotEight} : ${slotNine}\n------------------\n**| : : : : WIN : : : : |**\n**${message.author.username}** used **${bet}** and won **${prize3}**!`)
  }

  if (slotOne !== slotTwo && slotOne === slotThree && slotTwo !== slotThree) { //1 !== 2 | 1 === 3 | 2 !== 3
    db.add(`coins_${message.author.id}`, prize4)
    slot.add(`totals_${message.author.id}`, 1)
            return message.channel.send(`**[ :slot_machine: | SLOTS ]**\n------------------\n${slotFour} : ${slotFive} : ${slotSix}\n\n${slotOne} : ${slotTwo} : ${slotThree}** <**\n\n${slotSeven} : ${slotEight} : ${slotNine}\n------------------\n**| : : : : WIN : : : : |**\n**${message.author.username}** used **${bet}** and won **${prize4}**!`);

   console.log(`${message.author.tag} (${message.author.id}) using slots command on ${message.guild.name} (${message.guild.id})!`)
          }
  
}
  

exports.conf = {
    aliases: ['slots'],
    cooldown: '10'
  }

exports.help = {
  name: 'slot',
  description: "Play the slot machine",
  usage: 'slot <number | or not>'
}